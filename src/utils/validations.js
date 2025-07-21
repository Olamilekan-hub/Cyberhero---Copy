var validate = require("validate.js");

export const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 20,
    },
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "Usernames can only contain letters and numbers",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 128,
    },
    format: {
      // Strong password pattern: at least 8 chars, 1 upper, 1 lower, 1 digit, 1 special
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
  email: {
    presence: true,
    email: true,
  },
};

export const validateThis = (value, fieldName) => {
  const formValues = {};
  formValues[fieldName] = value;
  const formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validate(formValues, formFields);
  if (result) {
    return result[fieldName][0];
  }
  return null;
};

export const validatePasswordStrength = (password, userInfo = {}) => {
  const result = {
    isValid: false,
    score: 0,
    feedback: [],
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      digits: false,
      symbols: false,
      notCommon: false
    }
  };

  if (!password) {
    result.feedback.push('Password is required');
    return result;
  }

  // Check length
  result.requirements.length = password.length >= 8 && password.length <= 128;
  if (!result.requirements.length) {
    result.feedback.push('Password must be 8-128 characters long');
  }

  // Check uppercase
  result.requirements.uppercase = /[A-Z]/.test(password);
  if (!result.requirements.uppercase) {
    result.feedback.push('Add at least one uppercase letter (A-Z)');
  }

  // Check lowercase
  result.requirements.lowercase = /[a-z]/.test(password);
  if (!result.requirements.lowercase) {
    result.feedback.push('Add at least one lowercase letter (a-z)');
  }

  // Check digits
  result.requirements.digits = /\d/.test(password);
  if (!result.requirements.digits) {
    result.feedback.push('Add at least one number (0-9)');
  }

  // Check symbols
  result.requirements.symbols = /[@$!%*?&]/.test(password);
  if (!result.requirements.symbols) {
    result.feedback.push('Add at least one special character (@$!%*?&)');
  }

  const commonPasswords = ['password', '123456', 'password123', 'admin', 'welcome'];
  result.requirements.notCommon = !commonPasswords.includes(password.toLowerCase());
  if (!result.requirements.notCommon) {
    result.feedback.push('This password is too common');
  }

  const requirementsMet = Object.values(result.requirements).filter(Boolean).length;
  result.score = Math.floor((requirementsMet / 6) * 4); // Scale to 0-4

  result.isValid = requirementsMet === 6;

  return result;
};