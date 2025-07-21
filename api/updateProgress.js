const { createConnection } = require("./helpers/connection");
const Progress = require("./models/progress.model");
const Achievement = require("./models/achievement.model");
const { createSecureResponse } = require("./helpers/security");
const AuthMiddleware = require("./helpers/authMiddleware");
const InputSanitizer = require("./helpers/sanitizer");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");
const DatabaseSecurity = require("./helpers/dbSecurity");

// Validation schema
const UPDATE_PROGRESS_SCHEMA = {
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
  },
  read: {
    type: 'boolean',
    required: false
  },
  action: {
    type: 'boolean',
    required: false
  },
  watch: {
    type: 'boolean',
    required: false
  },
  create: {
    type: 'boolean',
    required: false
  },
  quiz: {
    type: 'boolean',
    required: false
  },
  event: {
    type: 'boolean',
    required: false
  },
  articleID: {
    type: 'custom',
    validator: (value) => {
      if (!value || typeof value !== 'object') return {};
      const sanitized = {};
      Object.keys(value).forEach(key => {
        if (/^[0-5]$/.test(key) && typeof value[key] === 'boolean') {
          sanitized[key] = value[key];
        }
      });
      return sanitized;
    },
    required: false
  }
};

const updateProgressHandler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      return createSecureResponse(400, { 
        message: "Invalid JSON format" 
      });
    }

    // Sanitize and validate input
    let sanitizedData;
    try {
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, UPDATE_PROGRESS_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    // Verify user identity
    if (sanitizedData.userID !== event.user.userId) {
      return createSecureResponse(403, { 
        message: "Access denied: You can only update your own progress" 
      });
    }

    // Validate mission type
    if (!['Training', 'Global'].includes(sanitizedData.missionType)) {
      return createSecureResponse(400, { 
        message: "Invalid mission type" 
      });
    }

    await createConnection();

    // Get current progress with secure query
    const currentProgresses = await DatabaseSecurity.executeSafeQuery(
      () => Progress.find({ userID: sanitizedData.userID }),
      'get_user_progress',
      { userID: sanitizedData.userID }
    );

    let currentProgress;
    if (currentProgresses) {
      currentProgress = currentProgresses.find(
        (item) => item.contentfulID === sanitizedData.contentfulID
      );
    }

    // Build update object securely
    let newBody;
    if (sanitizedData.missionType === "Training") {
      newBody = {
        ...sanitizedData,
        Training: {
          read: {
            ...currentProgress?.Training?.read,
            ...(sanitizedData.read ? sanitizedData.articleID : {}),
          },
          action: {
            ...currentProgress?.Training?.action,
            ...(sanitizedData.action ? sanitizedData.articleID : {}),
          },
          watch: {
            ...currentProgress?.Training?.watch,
            ...(sanitizedData.watch ? sanitizedData.articleID : {}),
          },
          create: {
            ...currentProgress?.Training?.create,
            ...(sanitizedData.create ? sanitizedData.articleID : {}),
          },
          quiz: {
            ...currentProgress?.Training?.quiz,
            ...(sanitizedData.quiz ? sanitizedData.articleID : {}),
          },
        },
      };
    } else {
      newBody = {
        ...sanitizedData,
        Global: {
          read: {
            ...currentProgress?.Global?.read,
            ...(sanitizedData.read ? sanitizedData.articleID : {}),
          },
          action: {
            ...currentProgress?.Global?.action,
            ...(sanitizedData.action ? sanitizedData.articleID : {}),
          },
          watch: {
            ...currentProgress?.Global?.watch,
            ...(sanitizedData.watch ? sanitizedData.articleID : {}),
          },
          create: {
            ...currentProgress?.Global?.create,
            ...(sanitizedData.create ? sanitizedData.articleID : {}),
          },
          quiz: {
            ...currentProgress?.Global?.quiz,
            ...(sanitizedData.quiz ? sanitizedData.articleID : {}),
          },
        },
      };
    }

    // Update progress with secure query
    const result = await DatabaseSecurity.executeSafeQuery(
      () => Progress.findOneAndUpdate(
        {
          userID: sanitizedData.userID,
          contentfulID: sanitizedData.contentfulID,
        },
        newBody,
        {
          upsert: true,
          setDefaultsOnInsert: true,
          omitUndefined: true,
          new: true,
        }
      ),
      'update_progress',
      { userID: sanitizedData.userID, contentfulID: sanitizedData.contentfulID }
    );

    // Award XP based on task completion
    const achievementState = await DatabaseSecurity.executeSafeQuery(
      () => Achievement.findOneAndUpdate(
        { userID: sanitizedData.userID },
        {
          xp: await xpAwardCalculation(sanitizedData),
        },
        {
          new: true,
        }
      ),
      'update_achievement',
      { userID: sanitizedData.userID }
    );

    // Update completion status if all tasks are done
    let finalResult = result;
    if (allTasksCompleteCheck(result)) {
      finalResult = await DatabaseSecurity.executeSafeQuery(
        () => Progress.findByIdAndUpdate(
          result._id,
          { complete: true },
          {
            new: true,
          }
        ),
        'complete_mission',
        { progressId: result._id }
      );
    }

    return createSecureResponse(200, {
      message: "Progress updated successfully",
      progress: finalResult,
      xp: achievementState?.xp
    });

  } catch (error) {
    console.error('Update progress error:', DatabaseSecurity.sanitizeDBError(error));
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

const allTasksCompleteCheck = (doc) => {
  if (doc.quiz) return true;
  return false;
};

const xpAwardCalculation = async (requestBody) => {
  try {
    const currentProgress = await Progress.find({ userID: requestBody.userID });
    let sum = 0;
    const mode = ["Global", "Training"];
    const category = { read: 2, action: 6, watch: 2, create: 4, quiz: 10 };
    
    currentProgress.map((progress) => {
      mode.map((md) => {
        Object.keys(category).map((ct, index) => {
          if (index < Object.keys(category).length) {
            Object.values(progress?.[`${md}`]?.[`${ct}`] || {}).map((item, j) => {
              if (j < Object.values(progress?.[`${md}`]?.[`${ct}`] || {}).length - 1) {
                if (
                  ct === "quiz" &&
                  progress.quiz &&
                  !item &&
                  md === progress.missionType
                )
                  sum -= category[`${ct}`] / 2;
                else sum += item * category[`${ct}`];
              }
            });
          }
        });
      });
    });
    return sum;
  } catch (error) {
    console.error('XP calculation error:', error);
    return 0;
  }
};

exports.handler = rateLimitMiddleware('general')(
  (event, context) => AuthMiddleware.requireAuth(event, updateProgressHandler)
);