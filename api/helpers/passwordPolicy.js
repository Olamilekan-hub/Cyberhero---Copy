const PasswordValidator = require('password-validator');
const zxcvbn = require('zxcvbn');

/**
 * Comprehensive password policy and strength checking
 */
class PasswordPolicy {
  
  constructor() {
    this.schema = new PasswordValidator();
    
    // Configure password requirements
    this.schema
      .is().min(8)                                     // Minimum length 8
      .is().max(128)                                   // Maximum length 128
      .has().uppercase()                               // Must have uppercase letters
      .has().lowercase()                               // Must have lowercase letters
      .has().digits()                                  // Must have digits
      .has().symbols()                                 // Must have symbols
      .has().not().spaces()                            // Should not have spaces
      .is().not().oneOf(this.getCommonPasswords());   // Blacklist common passwords
  }

  /**
   * Validate password against comprehensive policy
   * @param {string} password - Password to validate
   * @param {Object} userInfo - User context for personalized checking
   * @returns {Object} - Validation result
   */
  validatePassword(password, userInfo = {}) {
    const result = {
      isValid: false,
      score: 0,
      feedback: [],
      errors: [],
      strength: 'very-weak',
      requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        digits: false,
        symbols: false,
        notCommon: false,
        notPersonal: false
      }
    };

    // Basic validation
    if (!password || typeof password !== 'string') {
      result.errors.push('Password is required and must be a string');
      return result;
    }

    // Check against schema rules
    const schemaErrors = this.schema.validate(password, { list: true });
    
    // Map schema errors to user-friendly messages
    const errorMessages = this.mapSchemaErrors(schemaErrors);
    result.errors.push(...errorMessages);

    // Check individual requirements
    result.requirements.length = password.length >= 8 && password.length <= 128;
    result.requirements.uppercase = /[A-Z]/.test(password);
    result.requirements.lowercase = /[a-z]/.test(password);
    result.requirements.digits = /\d/.test(password);
    result.requirements.symbols = /[^A-Za-z0-9]/.test(password);
    result.requirements.notCommon = !this.isCommonPassword(password);
    result.requirements.notPersonal = !this.containsPersonalInfo(password, userInfo);

    // Use zxcvbn for strength analysis
    const strengthAnalysis = zxcvbn(password, this.getUserInputs(userInfo));
    result.score = strengthAnalysis.score;
    result.strength = this.mapStrengthScore(strengthAnalysis.score);

    // Add zxcvbn feedback
    if (strengthAnalysis.feedback.warning) {
      result.feedback.push(strengthAnalysis.feedback.warning);
    }
    if (strengthAnalysis.feedback.suggestions.length > 0) {
      result.feedback.push(...strengthAnalysis.feedback.suggestions);
    }

    // Check if password meets minimum requirements
    const meetsBasicRequirements = Object.values(result.requirements).every(req => req === true);
    const meetsStrengthRequirement = result.score >= 2; // Minimum score of 2

    result.isValid = meetsBasicRequirements && meetsStrengthRequirement && result.errors.length === 0;

    // Add additional feedback for weak passwords
    if (!result.isValid) {
      this.addStrengthFeedback(result);
    }

    return result;
  }

  /**
   * Check if password is in common passwords list
   * @param {string} password - Password to check
   * @returns {boolean} - True if common password
   */
  isCommonPassword(password) {
    const commonPasswords = this.getCommonPasswords();
    return commonPasswords.includes(password.toLowerCase());
  }

  /**
   * Check if password contains personal information
   * @param {string} password - Password to check
   * @param {Object} userInfo - User information
   * @returns {boolean} - True if contains personal info
   */
  containsPersonalInfo(password, userInfo) {
    if (!userInfo) return false;

    const lowerPassword = password.toLowerCase();
    const personalData = [
      userInfo.username,
      userInfo.email?.split('@')[0],
      userInfo.firstName,
      userInfo.lastName,
      userInfo.birthYear?.toString()
    ].filter(Boolean);

    return personalData.some(data => 
      data && lowerPassword.includes(data.toLowerCase())
    );
  }

  /**
   * Get user inputs for zxcvbn analysis
   * @param {Object} userInfo - User information
   * @returns {Array} - Array of user inputs
   */
  getUserInputs(userInfo) {
    if (!userInfo) return [];

    return [
      userInfo.username,
      userInfo.email,
      userInfo.firstName,
      userInfo.lastName,
      'mission',
      'gaia',
      'missiongaia'
    ].filter(Boolean);
  }

  /**
   * Map zxcvbn score to strength level
   * @param {number} score - zxcvbn score (0-4)
   * @returns {string} - Strength level
   */
  mapStrengthScore(score) {
    const strengthMap = {
      0: 'very-weak',
      1: 'weak', 
      2: 'fair',
      3: 'good',
      4: 'strong'
    };
    return strengthMap[score] || 'very-weak';
  }

  /**
   * Map schema validation errors to user-friendly messages
   * @param {Array} schemaErrors - Array of schema error codes
   * @returns {Array} - Array of user-friendly messages
   */
  mapSchemaErrors(schemaErrors) {
    const errorMap = {
      min: 'Password must be at least 8 characters long',
      max: 'Password must not exceed 128 characters',
      uppercase: 'Password must contain at least one uppercase letter (A-Z)',
      lowercase: 'Password must contain at least one lowercase letter (a-z)',
      digits: 'Password must contain at least one number (0-9)',
      symbols: 'Password must contain at least one special character (!@#$%^&*)',
      spaces: 'Password must not contain spaces',
      oneOf: 'Password is too common and easily guessed'
    };

    return schemaErrors.map(error => errorMap[error] || `Password requirement not met: ${error}`);
  }

  /**
   * strength-specific feedback
   * @param {Object} result - Password validation result
   */
  addStrengthFeedback(result) {
    if (result.score === 0) {
      result.feedback.unshift('This password is extremely weak and easily cracked');
    } else if (result.score === 1) {
      result.feedback.unshift('This password is weak and could be cracked quickly');
    }

    // Add specific improvement suggestions
    if (!result.requirements.length) {
      result.feedback.push('Use at least 8 characters');
    }
    if (!result.requirements.uppercase) {
      result.feedback.push('Add uppercase letters');
    }
    if (!result.requirements.lowercase) {
      result.feedback.push('Add lowercase letters');
    }
    if (!result.requirements.digits) {
      result.feedback.push('Add numbers');
    }
    if (!result.requirements.symbols) {
      result.feedback.push('Add special characters like !@#$%^&*');
    }
  }

  /**
   * list of common passwords to blacklist
   * @returns {Array} - Array of common passwords
   */
  getCommonPasswords() {
    return [
      // Top 100 most common passwords
      'password', '123456', '123456789', 'welcome', 'admin',
      'password123', '12345678', '1234567', '1234567890', 'qwerty',
      'abc123', 'Password', '123123', 'iloveyou', '1234',
      'admin123', 'letmein', 'welcome123', 'monkey', '1q2w3e4r',
      'qwertyuiop', '123321', 'dragon', '654321', 'master',
      'login', 'solo', 'passw0rd', 'starwars', 'hello',
      'freedom', 'superman', 'qazwsx', 'trustno1', 'jordan',
      'jennifer', 'zxcvbnm', 'asdfgh', 'hunter', 'buster',
      'soccer', 'harley', 'batman', 'andrew', 'tigger',
      'sunshine', 'iloveu', 'fuckme', '2000', 'charlie',
      'robert', 'thomas', 'hockey', 'ranger', 'daniel',
      'starwars', 'klaster', '112233', 'george', 'asshole',
      'computer', 'michelle', 'jessica', 'pepper', '1111',
      'zxcvbn', '555555', '11111111', '131313', 'freedom',
      '777777', 'pass', 'fuck', 'maggie', '159753',
      'aaaaaa', 'ginger', 'princess', 'joshua', 'cheese',
      'amanda', 'summer', 'love', 'ashley', 'nicole',
      'chelsea', 'biteme', 'matthew', 'access', 'yankees',
      '987654321', 'dallas', 'austin', 'thunder', 'taylor',
      'matrix', 'william', 'corvette', 'hello', 'martin',
      'heather', 'secret', 'merlin', 'diamond', '1234qwer',
      'gfhjkm', 'hammer', 'silver', '222222', '88888888'
    ];
  }

  /**
   * password strength indicator for UI
   * @param {number} score - Password strength score
   * @returns {Object} - UI indicator data
   */
  getStrengthIndicator(score) {
    const indicators = {
      0: { color: '#ff4757', text: 'Very Weak', width: '20%' },
      1: { color: '#ff6348', text: 'Weak', width: '40%' },
      2: { color: '#ffa502', text: 'Fair', width: '60%' },
      3: { color: '#2ed573', text: 'Good', width: '80%' },
      4: { color: '#1e90ff', text: 'Strong', width: '100%' }
    };

    return indicators[score] || indicators[0];
  }

  /**
   * @param {string} password - Password to check
   * @returns {Promise<boolean>} - True if password is breached
   */
  async isBreachedPassword(password) {
    // For now, just check against common passwords
    return this.isCommonPassword(password);
  }

  /**
   * Generate secure password suggestion
   * @returns {string} - Suggested secure password
   */
  generateSecurePassword() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    
    // Ensure at least one character from each required set
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill remaining length with random characters
    const allChars = lowercase + uppercase + digits + symbols;
    const targetLength = 12; // Good balance of security and usability
    
    for (let i = password.length; i < targetLength; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

module.exports = new PasswordPolicy();