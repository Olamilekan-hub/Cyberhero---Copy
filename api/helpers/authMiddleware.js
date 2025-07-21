const { JWTManager } = require('./auth');
const { createSecureResponse } = require('./security');

/**
 * Authentication middleware for protected routes
 */
class AuthMiddleware {
  
  /**
   * Require valid authentication for route
   * @param {Object} event - Lambda event
   * @param {Function} handler - Route handler function
   * @returns {Object} - Response with user context or error
   */
  static async requireAuth(event, handler) {
    try {
      if (event.httpMethod === 'OPTIONS') {
        return createSecureResponse(200, '');
      }

      // Authenticate the request
      const user = await JWTManager.authenticateRequest(event);
      
      event.user = user;
      
      return await handler(event);
      
    } catch (error) {
      console.error('Authentication error:', error.message);
      
      return createSecureResponse(401, {
        message: 'Authentication required',
        error: error.message
      });
    }
  }

  /**
   * Optional authentication - user context if token provided
   * @param {Object} event - Lambda event  
   * @param {Function} handler - Route handler function
   * @returns {Object} - Response with optional user context
   */
  static async optionalAuth(event, handler) {
    try {
      if (event.httpMethod === 'OPTIONS') {
        return createSecureResponse(200, '');
      }

      try {
        const user = await JWTManager.authenticateRequest(event);
        event.user = user;
      } catch (error) {
        // Authentication failed, but that's okay for optional routes
        event.user = null;
      }
      
      return await handler(event);
      
    } catch (error) {
      console.error('Handler error:', error.message);
      
      return createSecureResponse(500, {
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthMiddleware;