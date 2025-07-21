/**
 * Advanced rate limiting middleware for Netlify Functions
 * Uses in-memory storage with sliding window algorithm
 */
class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.blockedIPs = new Set();
    
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Rate limiting configurations for different endpoint types
   */
  static getLimitConfig(limitType) {
    const configs = {
      // Authentication endpoints - stricter limits
      'auth': {
        windowMs: 15 * 60 * 1000, 
        maxRequests: 5, 
        blockDurationMs: 30 * 60 * 1000, 
        message: 'Too many authentication attempts. Please try again later.'
      },
      
      // Password operations - prevent computation abuse
      'password': {
        windowMs: 5 * 60 * 1000, 
        maxRequests: 20, 
        blockDurationMs: 10 * 60 * 1000, 
        message: 'Too many password operations. Please slow down.'
      },
      
      // Email operations - prevent spam
      'email': {
        windowMs: 10 * 60 * 1000, 
        maxRequests: 3, 
        blockDurationMs: 60 * 60 * 1000, 
        message: 'Too many email requests. Please wait before requesting another.'
      },
      
      // Token refresh - prevent abuse
      'token': {
        windowMs: 5 * 60 * 1000, 
        maxRequests: 10, 
        blockDurationMs: 15 * 60 * 1000, 
        message: 'Too many token refresh attempts.'
      },
      
      // General API - standard limits
      'general': {
        windowMs: 1 * 60 * 1000, 
        maxRequests: 60, 
        blockDurationMs: 5 * 60 * 1000, 
        message: 'Too many requests. Please slow down.'
      },
      
      // Heavy operations - very strict
      'heavy': {
        windowMs: 10 * 60 * 1000, 
        maxRequests: 5, 
        blockDurationMs: 30 * 60 * 1000, 
        message: 'Too many resource-intensive requests.'
      }
    };
    
    return configs[limitType] || configs.general;
  }

  /**
   * Get client identifier (IP + User-Agent hash for better uniqueness)
   */
  getClientId(event) {
    const ip = event.headers['x-forwarded-for'] || 
               event.headers['x-real-ip'] || 
               event.requestContext?.identity?.sourceIp || 
               'unknown';
    
    const userAgent = event.headers['user-agent'] || '';
    const userAgentHash = this.simpleHash(userAgent);
    
    return `${ip}:${userAgentHash}`;
  }

  /**
   * Simple hash function for user agent
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 8);
  }

  /**
   * Check if request should be rate limited
   */
  shouldLimit(event, limitType = 'general') {
    const clientId = this.getClientId(event);
    const config = RateLimiter.getLimitConfig(limitType);
    const now = Date.now();

    // Check if IP is currently blocked
    const blockKey = `block:${clientId}`;
    const blockInfo = this.requests.get(blockKey);
    if (blockInfo && now < blockInfo.blockedUntil) {
      return {
        limited: true,
        message: config.message,
        retryAfter: Math.ceil((blockInfo.blockedUntil - now) / 1000),
        remaining: 0
      };
    }

    // Get or create request history for this client
    const requestKey = `requests:${clientId}:${limitType}`;
    let requestHistory = this.requests.get(requestKey) || [];

    // Remove requests outside the current window
    const windowStart = now - config.windowMs;
    requestHistory = requestHistory.filter(timestamp => timestamp > windowStart);

    // Check if limit exceeded
    if (requestHistory.length >= config.maxRequests) {
      // Block the client
      this.requests.set(blockKey, {
        blockedUntil: now + config.blockDurationMs,
        reason: `Rate limit exceeded for ${limitType}`
      });

      return {
        limited: true,
        message: config.message,
        retryAfter: Math.ceil(config.blockDurationMs / 1000),
        remaining: 0
      };
    }

    // Add current request and update history
    requestHistory.push(now);
    this.requests.set(requestKey, requestHistory);

    return {
      limited: false,
      remaining: config.maxRequests - requestHistory.length,
      resetTime: windowStart + config.windowMs
    };
  }

  /**
   * Cleanup old entries to prevent memory leaks
   */
  cleanup() {
    const now = Date.now();
    const keysToDelete = [];

    for (const [key, value] of this.requests.entries()) {
      if (key.startsWith('block:') && value.blockedUntil < now) {
        keysToDelete.push(key);
      } else if (key.startsWith('requests:') && Array.isArray(value)) {
        const recentRequests = value.filter(timestamp => now - timestamp < 24 * 60 * 60 * 1000);
        if (recentRequests.length === 0) {
          keysToDelete.push(key);
        } else {
          this.requests.set(key, recentRequests);
        }
      }
    }

    keysToDelete.forEach(key => this.requests.delete(key));
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Rate limiter cleanup: removed ${keysToDelete.length} entries, ${this.requests.size} active`);
    }
  }

  static createMiddleware(limitType = 'general') {
    return (handler) => {
      return async (event, context) => {
        if (event.httpMethod === 'OPTIONS') {
          return handler(event, context);
        }

        const limiter = rateLimiterInstance;
        const limitResult = limiter.shouldLimit(event, limitType);

        if (limitResult.limited) {
          return {
            statusCode: 429,
            headers: {
              'Retry-After': limitResult.retryAfter.toString(),
              'X-RateLimit-Limit': RateLimiter.getLimitConfig(limitType).maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'Content-Type': 'application/json',
              ...require('./security').getCorsHeaders(event.headers.origin)
            },
            body: JSON.stringify({
              error: 'Rate limit exceeded',
              message: limitResult.message,
              retryAfter: limitResult.retryAfter
            })
          };
        }

        const response = await handler(event, context);
        
        if (response && response.headers) {
          response.headers['X-RateLimit-Limit'] = RateLimiter.getLimitConfig(limitType).maxRequests.toString();
          response.headers['X-RateLimit-Remaining'] = limitResult.remaining.toString();
          response.headers['X-RateLimit-Reset'] = Math.ceil(limitResult.resetTime / 1000).toString();
        }

        return response;
      };
    };
  }
}

const rateLimiterInstance = new RateLimiter();

module.exports = {
  RateLimiter,
  rateLimitMiddleware: RateLimiter.createMiddleware,
  rateLimiterInstance
};