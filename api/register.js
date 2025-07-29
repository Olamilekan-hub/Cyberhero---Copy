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
6 
    await createConnection();

    // Make sure this account doesn't already exist
  //   const existingUser = await User.findOne({
  //   $or: [
  //     { email: sanitizedData.email }, 
  //     { username: sanitizedData.username }
  //   ],
  // }, null, { 
  //   collation: { locale: "en", strength: 2 } 
  // });
  const existingUser = await User.findByCredentials(sanitizedData.email) || 
                    await User.findByCredentials(sanitizedData.username);

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

    // Try to send verification email, but don't fail registration if email fails
    try {
      await sendVerificationEmail(newUser._id, newUser.email);
      
      return createSecureResponse(201, {
        message: "Registration successful! Please check your email to verify your account.",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          verified: newUser.verified
        }
      });
    } catch (emailError) {
      console.error('Email sending failed but user was created:', emailError.message);
      
      // Return success but inform user about email issue
      return createSecureResponse(201, {
        message: "Registration successful! However, there was an issue sending the verification email. Please contact support or try logging in.",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          verified: newUser.verified
        },
        emailWarning: "Verification email could not be sent. You may need to verify manually."
      });
    }

  } catch (error) {
    console.error('Registration error:', DatabaseSecurity.sanitizeDBError(error));
    
    // Handle specific error types
    if (error.code === 11000) {
      const field = error.keyPattern?.email ? 'email' : 'username';
      return createSecureResponse(400, { 
        message: `This ${field} is already registered. Please try logging in instead.` 
      });
    }
    
    return createSecureResponse(500, { 
      message: "Registration failed. Please try again." 
    });
  }
};

exports.handler = rateLimitMiddleware('auth')(registerHandler);