const validator = require('validator');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

// Create DOMPurify instance for server-side use
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Comprehensive input sanitization and validation
 */
class InputSanitizer {
  
  /**
   * Sanitize string input to prevent XSS
   * @param {string} input - The input string to sanitize
   * @param {object} options - Sanitization options
   * @returns {string} - Sanitized string
   */
  static sanitizeString(input, options = {}) {
    if (typeof input !== 'string') {
      return input;
    }

    const {
      allowHTML = false,
      maxLength = 1000,
      trim = true,
      escapeQuotes = true
    } = options;

    let sanitized = trim ? input.trim() : input;

    if (sanitized.length > maxLength) {
      throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }

    if (!allowHTML) {
      sanitized = validator.escape(sanitized);
    } else {
      sanitized = DOMPurify.sanitize(sanitized, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: []
      });
    }

    return sanitized;
  }

  /**
   * Sanitize email input
   * @param {string} email - Email to sanitize and validate
   * @returns {string} - Sanitized and validated email
   */
  static sanitizeEmail(email) {
    if (typeof email !== 'string') {
      throw new Error('Email must be a string');
    }

    const sanitized = validator.normalizeEmail(email.trim().toLowerCase());
    
    if (!validator.isEmail(sanitized)) {
      throw new Error('Invalid email format');
    }

    return sanitized;
  }

  /**
   * Sanitize username input
   * @param {string} username - Username to sanitize
   * @returns {string} - Sanitized username
   */
  static sanitizeUsername(username) {
    if (typeof username !== 'string') {
      throw new Error('Username must be a string');
    }

    const sanitized = username.trim();

    if (sanitized.length < 3 || sanitized.length > 20) {
      throw new Error('Username must be between 3 and 20 characters');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(sanitized)) {
      throw new Error('Username can only contain letters, numbers, and underscores');
    }

    return sanitized;
  }

  /**
 * Handle custom validation types
 * @param {any} value - Value to validate
 * @param {Object} config - Validation configuration
 * @param {Object} fullObject - Complete object being validated (for context)
 * @returns {any} - Validated value
 */
static handleCustomValidation(value, config, fullObject = {}) {
  if (config.validator && typeof config.validator === 'function') {
    try {
      return config.validator(value, fullObject);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return value;
}

static sanitizeObject(obj, schema) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be an object');
  }

  const sanitized = {};

  for (const [key, config] of Object.entries(schema)) {
    const value = obj[key];

    if (value === undefined && !config.required) {
      continue;
    }

    if (config.required && (value === undefined || value === null || value === '')) {
      throw new Error(`Field '${key}' is required`);
    }

    if (value === null || value === undefined) {
      continue;
    }

    try {
      switch (config.type) {
        case 'string':
          sanitized[key] = this.sanitizeString(value, config.options || {});
          break;
        case 'email':
          sanitized[key] = this.sanitizeEmail(value);
          break;
        case 'username':
          sanitized[key] = this.sanitizeUsername(value);
          break;
        case 'objectId':
          sanitized[key] = this.sanitizeObjectId(value);
          break;
        case 'boolean':
          sanitized[key] = this.sanitizeBoolean(value);
          break;
        case 'number':
          sanitized[key] = this.sanitizeNumber(value, config.options || {});
          break;
        case 'custom':
          sanitized[key] = this.handleCustomValidation(value, config, obj);
          break;
        case 'array':
          if (!Array.isArray(value)) {
            throw new Error(`Field '${key}' must be an array`);
          }
          sanitized[key] = value.map(item => 
            config.itemType ? this.sanitizeByType(item, config.itemType, config.itemOptions) : item
          );
          break;
        default:
          // For unknown types, just copy the value
          sanitized[key] = value;
      }
    } catch (error) {
      throw new Error(`Validation error for field '${key}': ${error.message}`);
    }
  }

  return sanitized;
}

  /**
   * Sanitize boolean input
   * @param {any} input - Input to convert to boolean
   * @returns {boolean} - Sanitized boolean
   */
  static sanitizeBoolean(input) {
    if (typeof input === 'boolean') {
      return input;
    }
    
    if (typeof input === 'string') {
      const lower = input.toLowerCase().trim();
      return lower === 'true' || lower === '1' || lower === 'yes';
    }
    
    return Boolean(input);
  }

  /**
   * Sanitize number input
   * @param {any} input - Input to convert to number
   * @param {object} options - Validation options
   * @returns {number} - Sanitized number
   */
  static sanitizeNumber(input, options = {}) {
    const { min = -Infinity, max = Infinity, integer = false } = options;

    if (typeof input === 'number') {
      if (isNaN(input) || !isFinite(input)) {
        throw new Error('Invalid number');
      }
    } else if (typeof input === 'string') {
      const parsed = integer ? parseInt(input.trim(), 10) : parseFloat(input.trim());
      if (isNaN(parsed)) {
        throw new Error('Invalid number format');
      }
      input = parsed;
    } else {
      throw new Error('Input must be a number or string');
    }

    if (input < min || input > max) {
      throw new Error(`Number must be between ${min} and ${max}`);
    }

    return input;
  }

  /**
   * Sanitize an entire object recursively
   * @param {object} obj - Object to sanitize
   * @param {object} schema - Sanitization schema
   * @returns {object} - Sanitized object
   */
  static sanitizeObject(obj, schema) {
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('Input must be an object');
    }

    const sanitized = {};

    for (const [key, config] of Object.entries(schema)) {
      const value = obj[key];

      if (value === undefined && !config.required) {
        continue;
      }

      if (config.required && (value === undefined || value === null || value === '')) {
        throw new Error(`Field '${key}' is required`);
      }

      if (value === null || value === undefined) {
        continue;
      }

      try {
        switch (config.type) {
          case 'string':
            sanitized[key] = this.sanitizeString(value, config.options || {});
            break;
          case 'email':
            sanitized[key] = this.sanitizeEmail(value);
            break;
          case 'username':
            sanitized[key] = this.sanitizeUsername(value);
            break;
          case 'objectId':
            sanitized[key] = this.sanitizeObjectId(value);
            break;
          case 'boolean':
            sanitized[key] = this.sanitizeBoolean(value);
            break;
          case 'number':
            sanitized[key] = this.sanitizeNumber(value, config.options || {});
            break;
          case 'array':
            if (!Array.isArray(value)) {
              throw new Error(`Field '${key}' must be an array`);
            }
            sanitized[key] = value.map(item => 
              config.itemType ? this.sanitizeByType(item, config.itemType, config.itemOptions) : item
            );
            break;
          default:
            // For unknown types, just copy the value
            sanitized[key] = value;
        }
      } catch (error) {
        throw new Error(`Validation error for field '${key}': ${error.message}`);
      }
    }

    return sanitized;
  }

  /**
   * Helper method to sanitize by type
   */
  static sanitizeByType(value, type, options = {}) {
    switch (type) {
      case 'string': return this.sanitizeString(value, options);
      case 'email': return this.sanitizeEmail(value);
      case 'username': return this.sanitizeUsername(value);
      case 'objectId': return this.sanitizeObjectId(value);
      case 'boolean': return this.sanitizeBoolean(value);
      case 'number': return this.sanitizeNumber(value, options);
      default: return value;
    }
  }
}

module.exports = InputSanitizer;