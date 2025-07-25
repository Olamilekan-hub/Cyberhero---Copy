/**
 * Database security utilities for MongoDB operations
 * Prevents NoSQL injection and implements security best practices
 */
const mongoose = require('mongoose');

class DatabaseSecurity {
  
  /**
   * Sanitize user input to prevent NoSQL injection
   * @param {any} payload - User input to sanitize
   * @returns {any} - Sanitized payload
   */
  static sanitizeNoSQLInput(payload) {
    if (payload && typeof payload === 'object') {
      // Handle arrays
      if (Array.isArray(payload)) {
        return payload.map(item => this.sanitizeNoSQLInput(item));
      }
      
      // Handle objects
      const sanitized = {};
      for (const [key, value] of Object.entries(payload)) {
        // Remove dangerous operators
        if (this.isDangerousOperator(key)) {
          continue;
        }
        // Recursively sanitize nested objects
        if (typeof value === 'object' && value !== null) {
          sanitized[key] = this.sanitizeNoSQLInput(value);
        } else {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }
    
    return payload;
  }

  /**
   * Check if a key is a dangerous MongoDB operator
   * @param {string} key - Key to check
   * @returns {boolean} - True if dangerous
   */
  static isDangerousOperator(key) {
    const dangerousOperators = [
      '$where',
      '$regex',
      '$expr',
      '$jsonSchema',
      '$function',
      '$accumulator',
      '$addFields',
      '$bucket',
      '$bucketAuto',
      '$changeStream',
      '$collStats',
      '$currentOp',
      '$facet',
      '$geoNear',
      '$graphLookup',
      '$indexStats',
      '$listLocalSessions',
      '$listSessions',
      '$lookup',
      '$merge',
      '$out',
      '$planCacheStats',
      '$redact',
      '$replaceRoot',
      '$sample',
      '$unionWith'
    ];
    
    return dangerousOperators.includes(key) || key.startsWith('$');
  }

  /**
   * Validate ObjectId format safely
   * @param {string} id - ID to validate
   * @returns {boolean} - True if valid ObjectId
   */
  static isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && 
           String(new mongoose.Types.ObjectId(id)) === id;
  }

  /**
   * Create safe query options with limits
   * @param {Object} options - Query options
   * @returns {Object} - Safe query options
   */
  static createSafeQueryOptions(options = {}) {
    const safeOptions = {
      // Limit result set size to prevent DoS
      limit: Math.min(options.limit || 100, 1000),
      
      // Add timeout to prevent long-running queries
      maxTimeMS: options.maxTimeMS || 10000, // 10 seconds max
      
      // Disable potentially dangerous options
      explain: false,
      snapshot: false,
      
      // Safe projection (exclude sensitive fields by default)
      select: options.select || this.getDefaultProjection(),
      
      // Safe population
      populate: this.sanitizePopulateOptions(options.populate),
      
      // Safe sorting (prevent NoSQL injection in sort)
      sort: this.sanitizeSortOptions(options.sort)
    };

    return safeOptions;
  }

  /**
   * Get default projection that excludes sensitive fields
   * @returns {Object} - Safe projection object
   */
  static getDefaultProjection() {
    return {
      password: 0,
      refreshTokenHash: 0,
      passwordResetToken: 0,
      __v: 0
    };
  }

  /**
   * Sanitize sort options to prevent injection
   * @param {any} sort - Sort options
   * @returns {Object} - Safe sort options
   */
  static sanitizeSortOptions(sort) {
    if (!sort || typeof sort !== 'object') {
      return {};
    }

    const safeSortFields = [
      'createdAt', 'updatedAt', 'username', 'email', 'xp', 'rank',
      'favorites', 'name', 'title', '_id'
    ];

    const safeSort = {};
    for (const [field, direction] of Object.entries(sort)) {
      // Only allow safe fields and valid sort directions
      if (safeSortFields.includes(field) && [1, -1, 'asc', 'desc'].includes(direction)) {
        safeSort[field] = direction;
      }
    }

    return safeSort;
  }

  /**
   * Sanitize populate options
   * @param {any} populate - Populate options
   * @returns {any} - Safe populate options
   */
  static sanitizePopulateOptions(populate) {
    if (!populate) return null;
    
    if (typeof populate === 'string') {
      // Only allow safe field names
      const safeFields = ['userID', 'contentfulID', 'artID', 'missionID'];
      return safeFields.includes(populate) ? populate : null;
    }
    
    if (Array.isArray(populate)) {
      return populate.filter(item => 
        typeof item === 'string' && 
        ['userID', 'contentfulID', 'artID', 'missionID'].includes(item)
      );
    }
    
    return null;
  }

  /**
   * Create safe aggregation pipeline
   * @param {Array} pipeline - Aggregation pipeline
   * @returns {Array} - Safe pipeline
   */
  static createSafeAggregationPipeline(pipeline = []) {
    const safePipeline = [];
    const allowedStages = ['$match', '$group', '$sort', '$limit', '$skip', '$project'];
    
    for (const stage of pipeline) {
      if (typeof stage === 'object' && stage !== null) {
        for (const [stageType, stageData] of Object.entries(stage)) {
          if (allowedStages.includes(stageType)) {
            // Sanitize stage data
            if (stageType === '$match') {
              safePipeline.push({ [stageType]: this.sanitizeNoSQLInput(stageData) });
            } else if (stageType === '$limit') {
              safePipeline.push({ [stageType]: Math.min(stageData, 1000) });
            } else {
              safePipeline.push({ [stageType]: stageData });
            }
          }
        }
      }
    }
    
    // Always add a limit as final stage if not present
    const hasLimit = safePipeline.some(stage => stage.$limit);
    if (!hasLimit) {
      safePipeline.push({ $limit: 1000 });
    }
    
    return safePipeline;
  }

  /**
   * Execute safe database query with monitoring
   * @param {Function} queryFunction - Database query function
   * @param {string} operation - Operation name for logging
   * @param {Object} metadata - Additional metadata for logging
   * @returns {Promise} - Query result
   */
  static async executeSafeQuery(queryFunction, operation = 'unknown', metadata = {}) {
    const startTime = Date.now();
    
    try {
      const result = await queryFunction();
      const duration = Date.now() - startTime;
      
      // Log successful queries
      if (process.env.NODE_ENV !== 'production') {
        console.log(`DB Query Success: ${operation} (${duration}ms)`, {
          operation,
          duration,
          metadata
        });
      }
      
      // Alert on slow queries
      if (duration > 5000) {
        console.warn(`Slow DB Query: ${operation} took ${duration}ms`, metadata);
      }
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Log database errors 
      console.error(`DB Query Error: ${operation} (${duration}ms)`, {
        operation,
        duration,
        error: this.sanitizeDBError(error),
        metadata
      });
      
      throw this.createSafeDBError(error);
    }
  }

  /**
   * Sanitize database errors to prevent information disclosure
   * @param {Error} error - Original database error
   * @returns {Object} - Sanitized error info
   */
  static sanitizeDBError(error) {
    return {
      name: error.name,
      code: error.code,
      message: error.message?.replace(/mongodb:\/\/[^@]+@/, 'mongodb://[REDACTED]@'),
      type: 'database_error'
    };
  }

  /**
   * Create safe error for client response
   * @param {Error} error - Original error
   * @returns {Error} - Safe error for client
   */
  static createSafeDBError(error) {
    // Map specific MongoDB errors to safe client messages
    const errorMappings = {
      11000: 'Duplicate entry detected',
      11001: 'Duplicate entry detected', 
      'CastError': 'Invalid data format',
      'ValidationError': 'Data validation failed',
      'MongoTimeoutError': 'Database operation timed out',
      'MongoNetworkError': 'Database connection failed'
    };

    const clientMessage = errorMappings[error.code] || 
                         errorMappings[error.name] || 
                         'Database operation failed';

    const safeError = new Error(clientMessage);
    safeError.statusCode = 500;
    return safeError;
  }

  /**
   * Validate database connection security
   * @param {string} connectionString - MongoDB connection string
   * @returns {Object} - Validation result
   */
  static validateConnectionSecurity(connectionString) {
    const issues = [];
    
    // Check for SSL/TLS
    if (!connectionString.includes('ssl=true') && !connectionString.includes('tls=true')) {
      issues.push('Connection not encrypted');
    }
    
    // Check for authentication
    if (!connectionString.includes('@')) {
      issues.push('No authentication credentials');
    }
    
    // Check for connection pooling
    if (!connectionString.includes('maxPoolSize')) {
      issues.push('No connection pool size limit');
    }
    
    return {
      isSecure: issues.length === 0,
      issues
    };
  }
}

module.exports = DatabaseSecurity;