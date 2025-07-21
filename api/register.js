// Libraries
const bcrypt = require("bcrypt");

// Models
const User = require("./models/user.model");
const Profile = require("./models/profile.model");
const Inventory = require("./models/inventory.model");
const Achievement = require("./models/achievement.model");
const FavoriteArts = require("./models/favoriteArts.model");

// Helpers
const { createConnection } = require("./helpers/connection");
const { sendVerificationEmail } = require("./helpers/email");
const { createSecureResponse } = require("./helpers/security");
const InputSanitizer = require("./helpers/sanitizer");
const { USER_REGISTRATION_SCHEMA } = require("./helpers/schemas");
const { rateLimitMiddleware } = require("./helpers/rateLimiter");

// Mailchimp
const { addSubscriber } = require("./helpers/mailChimp");
const { addTagsToSubscriber } = require("./helpers/mailChimp");

// Constants
const saltRounds = 10;

const registerHandler = async (event, context) => {
  try {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return createSecureResponse(200, '');
    }

    // Parse and sanitize input
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
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, USER_REGISTRATION_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }

    await createConnection();

    // Make sure this account doesn't already exist
    const existingUser = await User.findOne({
      $or: [
        { email: sanitizedData.email }, 
        { username: sanitizedData.username }
      ],
    }).collation({ locale: "en", strength: 2 });

    // Check if the user already exists
    if (existingUser) {
      let message;
      if (
        existingUser.username.toLowerCase() ===
        sanitizedData.username.toLowerCase()
      ) {
        message = "Username already exists";
      } else {
        message = "Email address already exists";
      }

      return createSecureResponse(400, { message });
    }

    // Hash passwords and store user
    const hashedPass = await bcrypt.hash(sanitizedData.password, saltRounds);
    const userObj = new User({
      username: sanitizedData.username,
      email: sanitizedData.email,
      password: hashedPass,
      isSubscribed: sanitizedData.isSubscribed || false,
    });
    const newUser = await userObj.save();

    // Set some default values in databases now
    await Achievement.create({
      username: newUser.username,
      userID: newUser._id,
    });
    await Profile.create({
      userID: newUser._id,
    });
    await FavoriteArts.create({
      userID: newUser._id,
    });
    await Inventory.create({
      userID: newUser._id,
    });

    // Send email
    await sendVerificationEmail(newUser._id, newUser.email);

    if (sanitizedData.isSubscribed) {
      console.log("Adding to Mailchimp with enhanced data");

      // Add subscriber with more detailed information
      const mailchimpResult = await addSubscriber(
        newUser.email,
        sanitizedData.username, // firstName field
        "", // lastName (can be added to registration form)
        ["new-user", "mission-gaia"] // default tags
      );

      if (mailchimpResult && !mailchimpResult.error) {
        const additionalTags = [];

        if (sanitizedData.preferences?.newFeatures)
          additionalTags.push("new-features");
        if (sanitizedData.preferences?.contentUpdates)
          additionalTags.push("content-updates");
        if (sanitizedData.preferences?.announcements)
          additionalTags.push("announcements");

        // Add age-appropriate content tags
        if (sanitizedData.age) {
          if (sanitizedData.age >= 9 && sanitizedData.age <= 12) {
            additionalTags.push("target-age");
          }
        }

        if (additionalTags.length > 0) {
          await addTagsToSubscriber(newUser.email, additionalTags);
        }
      }
    }

    return createSecureResponse(200, {
      message: "success",
      email: newUser.email,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return createSecureResponse(500, { 
      message: "Internal server error" 
    });
  }
};

exports.handler = rateLimitMiddleware('auth')(registerHandler);