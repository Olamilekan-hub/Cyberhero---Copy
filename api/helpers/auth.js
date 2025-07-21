const jwt = require("jsonwebtoken");
const { createConnection } = require("./connection");
const User = require("../models/user.model");

// JWT Security Configuration
const JWT_CONFIG = {
  // Access token (short-lived)
  ACCESS_TOKEN: {
    secret: process.env.JWT_SECRET,
    algorithm: "HS256",
    expiresIn: "15m", // 15 minutes
    issuer: "mission-gaia-api",
    audience: "mission-gaia-users"
  },
  // Refresh token (longer-lived)
  REFRESH_TOKEN: {
    secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + "_refresh",
    algorithm: "HS256", 
    expiresIn: "7d", // 7 days
    issuer: "mission-gaia-api",
    audience: "mission-gaia-refresh"
  }
};

/**
 * Enhanced JWT management with security best practices
 */
class JWTManager {
  
  /**
   * Create access token (short-lived)
   * @param {Object} payload - Token payload
   * @returns {string} - Signed JWT
   */
  static createAccessToken(payload) {
    // Validate required environment variables
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    const sanitizedPayload = {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      verified: payload.verified,
      // Add timestamp for additional security
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(sanitizedPayload, JWT_CONFIG.ACCESS_TOKEN.secret, {
      algorithm: JWT_CONFIG.ACCESS_TOKEN.algorithm,
      expiresIn: JWT_CONFIG.ACCESS_TOKEN.expiresIn,
      issuer: JWT_CONFIG.ACCESS_TOKEN.issuer,
      audience: JWT_CONFIG.ACCESS_TOKEN.audience,
      subject: payload.userId.toString(),
      jwtid: this.generateJTI(),
    });
  }

  /**
   * Create refresh token (longer-lived)
   * @param {Object} payload - Token payload  
   * @returns {string} - Signed refresh JWT
   */
  static createRefreshToken(payload) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    const refreshPayload = {
      userId: payload.userId,
      username: payload.username,
      tokenType: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(refreshPayload, JWT_CONFIG.REFRESH_TOKEN.secret, {
      algorithm: JWT_CONFIG.REFRESH_TOKEN.algorithm,
      expiresIn: JWT_CONFIG.REFRESH_TOKEN.expiresIn,
      issuer: JWT_CONFIG.REFRESH_TOKEN.issuer,
      audience: JWT_CONFIG.REFRESH_TOKEN.audience,
      subject: payload.userId.toString(),
      jwtid: this.generateJTI(),
    });
  }

  /**
   * Verify access token with comprehensive validation
   * @param {string} token - JWT to verify
   * @returns {Object} - Decoded token payload
   */
  static verifyAccessToken(token) {
    if (!token) {
      throw new Error('Token is required');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.ACCESS_TOKEN.secret, {
        algorithms: [JWT_CONFIG.ACCESS_TOKEN.algorithm],
        issuer: JWT_CONFIG.ACCESS_TOKEN.issuer,
        audience: JWT_CONFIG.ACCESS_TOKEN.audience,
        clockTolerance: 60, 
      });

      // Additional security checks
      this.validateTokenStructure(decoded);
      
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      } else if (error.name === 'NotBeforeError') {
        throw new Error('Access token not active yet');
      }
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  /**
   * Verify refresh token
   * @param {string} token - Refresh JWT to verify
   * @returns {Object} - Decoded token payload
   */
  static verifyRefreshToken(token) {
    if (!token) {
      throw new Error('Refresh token is required');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.REFRESH_TOKEN.secret, {
        algorithms: [JWT_CONFIG.REFRESH_TOKEN.algorithm],
        issuer: JWT_CONFIG.REFRESH_TOKEN.issuer,
        audience: JWT_CONFIG.REFRESH_TOKEN.audience,
        clockTolerance: 60,
      });

      if (decoded.tokenType !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      }
      throw new Error(`Refresh token verification failed: ${error.message}`);
    }
  }

  /**
   * Create both access and refresh tokens
   * @param {Object} payload - User payload
   * @returns {Object} - Token pair
   */
  static createTokenPair(payload) {
    const accessToken = this.createAccessToken(payload);
    const refreshToken = this.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60, 
      tokenType: 'Bearer'
    };
  }

  /**
   * Refresh access token using refresh token
   * @param {string} refreshToken - Valid refresh token
   * @returns {Object} - New token pair
   */
  static async refreshTokenPair(refreshToken) {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);

      await createConnection();
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.verified) {
        throw new Error('User account not verified');
      }

      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified
      };

      return this.createTokenPair(payload);
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  /**
   * Extract token from Authorization header
   * @param {Object} headers - Request headers
   * @returns {string|null} - Extracted token
   */
  static extractTokenFromHeaders(headers) {
    const authHeader = headers.authorization || headers.Authorization;
    
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Invalid authorization header format');
    }

    return parts[1];
  }

  /**
   * Middleware to authenticate requests
   * @param {Object} event - Lambda event object
   * @returns {Object} - User information or throws error
   */
  static async authenticateRequest(event) {
    try {
      const token = this.extractTokenFromHeaders(event.headers);
      
      if (!token) {
        throw new Error('Authentication token required');
      }

      const decoded = this.verifyAccessToken(token);
      
      // Get fresh user data for additional verification
      await createConnection();
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.verified) {
        throw new Error('User account not verified');
      }

      return {
        userId: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified
      };
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  /**
   * Generate unique JWT ID
   * @returns {string} - Unique identifier
   */
  static generateJTI() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Validate token structure
   * @param {Object} decoded - Decoded JWT payload
   */
  static validateTokenStructure(decoded) {
    const requiredFields = ['userId', 'username', 'iat', 'exp', 'iss', 'aud'];
    
    for (const field of requiredFields) {
      if (!decoded.hasOwnProperty(field)) {
        throw new Error(`Token missing required field: ${field}`);
      }
    }

    if (!/^[0-9a-fA-F]{24}$/.test(decoded.userId)) {
      throw new Error('Invalid userId format in token');
    }
  }

  /**
   * Get token expiration info
   * @param {string} token - JWT to analyze
   * @returns {Object} - Expiration information
   */
  static getTokenInfo(token) {
    try {
      const decoded = jwt.decode(token);
      
      if (!decoded || !decoded.exp) {
        throw new Error('Invalid token format');
      }

      const now = Math.floor(Date.now() / 1000);
      const expiresAt = decoded.exp;
      const timeToExpiry = expiresAt - now;

      return {
        expiresAt: new Date(expiresAt * 1000),
        timeToExpiry: timeToExpiry,
        isExpired: timeToExpiry <= 0,
        willExpireSoon: timeToExpiry <= 300 
      };
    } catch (error) {
      throw new Error(`Unable to analyze token: ${error.message}`);
    }
  }
}

const createJWT = (payload) => {
  console.warn('createJWT is deprecated. Use JWTManager.createAccessToken instead.');
  return JWTManager.createAccessToken(payload);
};

const verifyJWT = async (conn, token) => {
  console.warn('verifyJWT is deprecated. Use JWTManager.verifyAccessToken instead.');
  return JWTManager.verifyAccessToken(token);
};

module.exports = { 
  createJWT, 
  verifyJWT, 
  JWTManager 
};