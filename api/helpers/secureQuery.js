
const DatabaseSecurity = require('./dbSecurity');

/**
 * Middleware to sanitize query parameters and add security controls
 */
const secureQueryMiddleware = (model) => {
  
  const originalFind = model.find;
  model.find = function(filter = {}, projection, options) {
    const safeFilter = DatabaseSecurity.sanitizeNoSQLInput(filter);
    const safeOptions = DatabaseSecurity.createSafeQueryOptions(options);
    const safeProjection = projection || DatabaseSecurity.getDefaultProjection();
    
    return DatabaseSecurity.executeSafeQuery(
      () => originalFind.call(this, safeFilter, safeProjection, safeOptions),
      'find',
      { model: model.modelName, filter: safeFilter }
    );
  };

  const originalFindOne = model.findOne;
    model.findOne = function(filter = {}, projection, options) {
      const safeFilter = DatabaseSecurity.sanitizeNoSQLInput(filter);
      const safeOptions = DatabaseSecurity.createSafeQueryOptions(options);
      
      // Handle password inclusion for authentication
      let safeProjection;
      if (projection && typeof projection === 'object' && projection.password === 1) {
        // If password is explicitly requested, allow it
        safeProjection = projection;
      } else {
        // Otherwise use default secure projection
        safeProjection = projection || DatabaseSecurity.getDefaultProjection();
      }
      
      return DatabaseSecurity.executeSafeQuery(
        () => originalFindOne.call(this, safeFilter, safeProjection, safeOptions),
        'findOne',
        { model: model.modelName, filter: safeFilter }
      );
    };


  const originalFindById = model.findById;
  model.findById = function(id, projection, options) {
    if (!DatabaseSecurity.isValidObjectId(id)) {
      throw new Error('Invalid document ID format');
    }
    
    const safeOptions = DatabaseSecurity.createSafeQueryOptions(options);
    const safeProjection = projection || DatabaseSecurity.getDefaultProjection();
    
    return DatabaseSecurity.executeSafeQuery(
      () => originalFindById.call(this, id, safeProjection, safeOptions),
      'findById',
      { model: model.modelName, id }
    );
  };

  const originalFindOneAndUpdate = model.findOneAndUpdate;
  model.findOneAndUpdate = function(filter, update, options = {}) {
    const safeFilter = DatabaseSecurity.sanitizeNoSQLInput(filter);
    const safeUpdate = DatabaseSecurity.sanitizeNoSQLInput(update);
    
    // Use the new createSafeUpdateOptions method instead of createSafeQueryOptions
    const safeOptions = DatabaseSecurity.createSafeUpdateOptions(options);
    
    return DatabaseSecurity.executeSafeQuery(
      () => originalFindOneAndUpdate.call(this, safeFilter, safeUpdate, safeOptions),
      'findOneAndUpdate',
      { model: model.modelName, filter: safeFilter }
    );
  };

  const originalAggregate = model.aggregate;
  model.aggregate = function(pipeline, options) {
    const safePipeline = DatabaseSecurity.createSafeAggregationPipeline(pipeline);
    const safeOptions = {
      maxTimeMS: 10000,
      allowDiskUse: false, 
      ...options
    };
    
    return DatabaseSecurity.executeSafeQuery(
      () => originalAggregate.call(this, safePipeline, safeOptions),
      'aggregate',
      { model: model.modelName, pipelineLength: safePipeline.length }
    );
  };

  return model;
};

module.exports = { secureQueryMiddleware };