/**
 * Centralized environment variable validation and management
 */
class EnvironmentValidator {
  constructor() {
    this.requiredSecrets = new Map([
      ['JWT_SECRET', 'Authentication token signing'],
      ['JWT_REFRESH_SECRET', 'Refresh token signing'], 
      ['DB_URL', 'Database connection'],
      ['SENDGRID_API_KEY', 'Email service'],
      ['CONTENTFUL_ACCESS_TOKEN', 'Content management'],
      ['CONTENTFUL_PREVIEW_TOKEN', 'Content preview'],
      ['CONTENTFUL_SPACE_ID', 'Content space'],
      ['MAILCHIMP_API_KEY', 'Email marketing'],
      ['MAILCHIMP_AUDIENCE_ID', 'Email list management'],
      ['MAILCHIMP_SERVER_PREFIX', 'Email service region']
    ]);
    
    this.optionalSecrets = new Map([
      ['EMAIL_LINK_URL', 'Email verification links'],
      ['SERVER_URL', 'Server configuration'],
      ['LOCALHOST_EMAIL', 'Development email override']
    ]);
  }

  /**
   * Validate all required environment variables
   * @throws {Error} If any required variables are missing
   */
  validateRequired() {
    const missing = [];
    const invalid = [];

    for (const [key, description] of this.requiredSecrets) {
      const value = process.env[key];
      
      if (!value) {
        missing.push(`${key} (${description})`);
      } else if (!this.isValidSecret(key, value)) {
        invalid.push(`${key} (${description})`);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.map(m => m.split(' (')[0]).join(', ')}`);
    }

    if (invalid.length > 0) {
      throw new Error(`Invalid environment variables detected: ${invalid.map(m => m.split(' (')[0]).join(', ')}`);
    }
  }

  /**
   * Validate specific secret format
   */
  isValidSecret(key, value) {
    switch (key) {
      case 'JWT_SECRET':
      case 'JWT_REFRESH_SECRET':
        return value.length >= 32; // Minimum 32 characters for JWT secrets
      
      case 'DB_URL':
        return value.startsWith('mongodb://') || value.startsWith('mongodb+srv://');
      
      case 'SENDGRID_API_KEY':
        return value.startsWith('SG.');
      
      case 'CONTENTFUL_ACCESS_TOKEN':
      case 'CONTENTFUL_PREVIEW_TOKEN':
        return value.length >= 40; 
      
      case 'MAILCHIMP_API_KEY':
        return value.includes('-') && value.length >= 30;
      
      default:
        return value.length > 0;
    }
  }

  getSanitizedError(error, context = '') {
    const message = error.message || 'Unknown error';
    
    let sanitized = message
      .replace(/sk_[a-zA-Z0-9_]+/g, '[API_KEY_REDACTED]')
      .replace(/SG\.[a-zA-Z0-9_-]+/g, '[SENDGRID_KEY_REDACTED]')
      .replace(/mongodb:\/\/[^@]+@/g, 'mongodb://[CREDENTIALS_REDACTED]@')
      .replace(/mongodb\+srv:\/\/[^@]+@/g, 'mongodb+srv://[CREDENTIALS_REDACTED]@')
      .replace(/[a-zA-Z0-9]{32,}/g, '[TOKEN_REDACTED]');

    return `${context ? context + ': ' : ''}${sanitized}`;
  }

  /**
   * Check if running in production
   */
  isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}

module.exports = new EnvironmentValidator();