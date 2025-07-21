const passwordPolicy = require('./passwordPolicy');

const PASSWORD_VALIDATION_SCHEMA = {
  password: {
    type: 'custom',
    validator: (password, userInfo = {}) => {
      const validation = passwordPolicy.validatePassword(password, userInfo);
      if (!validation.isValid) {
        throw new Error(validation.errors.join('; '));
      }
      return password;
    },
    required: true
  }
};

const USER_REGISTRATION_SCHEMA = {
  username: {
    type: 'username',
    required: true
  },
  email: {
    type: 'email',
    required: true
  },
  password: {
    type: 'custom',
    validator: (password, userInfo = {}) => {
      const validation = passwordPolicy.validatePassword(password, {
        username: userInfo.username,
        email: userInfo.email
      });
      if (!validation.isValid) {
        const errors = [...validation.errors, ...validation.feedback];
        throw new Error(errors.join('; '));
      }
      return password;
    },
    required: true
  },
  isSubscribed: {
    type: 'boolean',
    required: false
  }
};

const USER_LOGIN_SCHEMA = {
  username: {
    type: 'username',
    required: true
  },
  password: {
    type: 'string',
    required: true,
    options: {
      allowHTML: false,
      maxLength: 128
    }
  }
};

const ART_CREATION_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  content: {
    type: 'string',
    required: true,
    options: {
      allowHTML: false,
      maxLength: 100000 
    }
  },
  public: {
    type: 'boolean',
    required: false
  }
};

const PROFILE_UPDATE_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  bio: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 500
    }
  },
  avatarID: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 100
    }
  },
  petID: {
    type: 'string',
    required: false,
    options: {
      allowHTML: false,
      maxLength: 100
    }
  }
};

const PROGRESS_UPDATE_SCHEMA = {
  userID: {
    type: 'objectId',
    required: true
  },
  missionName: {
    type: 'string',
    required: true,
    options: {
      allowHTML: false,
      maxLength: 200
    }
  },
  missionType: {
    type: 'string',
    required: true,
    options: {
      allowHTML: false,
      maxLength: 50
    }
  },
  contentfulID: {
    type: 'string',
    required: true,
    options: {
      allowHTML: false,
      maxLength: 100
    }
  }
};

module.exports = {
  USER_REGISTRATION_SCHEMA,
  USER_LOGIN_SCHEMA,
  ART_CREATION_SCHEMA,
  PROFILE_UPDATE_SCHEMA,
  PROGRESS_UPDATE_SCHEMA,
  PASSWORD_VALIDATION_SCHEMA
};