const mongoose = require("mongoose");
const envValidator = require("./envValidator");
const DatabaseSecurity = require("./dbSecurity");

mongoose.Promise = global.Promise;
let isConnected;

const createConnection = async () => {
  if (isConnected) {
    return Promise.resolve();
  }

  try {
    envValidator.validateRequired();
    
    const connectionSecurity = DatabaseSecurity.validateConnectionSecurity(process.env.DB_URL);
    if (!connectionSecurity.isSecure && envValidator.isProduction()) {
      console.warn('Database connection security issues:', connectionSecurity.issues);
    }

    const secureConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      
      // Security enhancements
      maxPoolSize: 10, 
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
      family: 4, 
      bufferMaxEntries: 0, 
      bufferCommands: false, 
      
      // Authentication and encryption
      authSource: 'admin', 
      ssl: envValidator.isProduction(), 
      
      // Connection monitoring
      heartbeatFrequencyMS: 10000, 
      
      // Security timeouts
      connectTimeoutMS: 10000, 
      maxIdleTimeMS: 30000,
    };

    const db = await mongoose.connect(process.env.DB_URL, secureConnectionOptions);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', DatabaseSecurity.sanitizeDBError(error));
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
      isConnected = true;
    });

    // Enable strict mode to prevent accidental queries on undefined fields
    mongoose.set('strict', true);
    
    // Disable debug mode in production
    mongoose.set('debug', !envValidator.isProduction());
    
    // Set strict query mode
    mongoose.set('strictQuery', true);

    isConnected = db.connections[0].readyState;
    return db.connections[0];

  } catch (error) {
    const sanitizedError = envValidator.getSanitizedError(error, 'Database connection failed');
    
    if (envValidator.isProduction()) {
      console.error('DB Connection Error:', DatabaseSecurity.sanitizeDBError(error));
      throw new Error('Database connection failed');
    } else {
      throw new Error(sanitizedError);
    }
  }
};

module.exports = { createConnection };