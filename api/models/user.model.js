const mongoose = require("mongoose");
const DatabaseSecurity = require("../helpers/dbSecurity");
const { secureQueryMiddleware } = require("../helpers/secureQuery");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9_]{3,20}$/.test(v);
      },
      message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
    }
  },
  password: { 
    type: String, 
    required: true,
    select: false 
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  token: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  refreshTokenHash: {
    type: String,
    select: false
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Schema options for security
  strict: true, 
  validateBeforeSave: true,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Indexes for performance and security
userSchema.index({ email: 1, verified: 1 });
userSchema.index({ username: 1, verified: 1 });
userSchema.index({ createdAt: 1 });

// Pre-save middleware to update timestamps
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-update middleware to update timestamps
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

userSchema.statics.findByCredentials = async function(identifier, includePassword = false) {
  const query = {
    $or: [
      { email: identifier },
      { username: identifier }
    ]
  };
  
  const projection = includePassword ? '+password' : DatabaseSecurity.getDefaultProjection();
  return this.findOne(DatabaseSecurity.sanitizeNoSQLInput(query), projection);
};

userSchema.statics.createSafely = async function(userData) {
  const sanitizedData = DatabaseSecurity.sanitizeNoSQLInput(userData);
  
  if (!sanitizedData.username || !sanitizedData.email || !sanitizedData.password) {
    throw new Error('Username, email, and password are required');
  }
  
  return this.create(sanitizedData);
};

userSchema.methods.toSafeObject = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.token;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.refreshTokenHash;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = secureQueryMiddleware(User);