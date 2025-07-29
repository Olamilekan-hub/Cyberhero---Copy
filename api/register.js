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
const DatabaseSecurity = require("./helpers/dbSecurity"); 

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

    let sanitizedData;
    try {
      sanitizedData = InputSanitizer.sanitizeObject(requestBody, USER_REGISTRATION_SCHEMA);
    } catch (error) {
      return createSecureResponse(400, { 
        message: `Input validation failed: ${error.message}` 
      });
    }
    
    await createConnection();

    const existingUser = await User.findByCredentials(sanitizedData.email) || 
                        await User.findByCredentials(sanitizedData.username);

    if (existingUser) {
      let message;
      if (existingUser.username.toLowerCase() === sanitizedData.username.toLowerCase()) {
        message = "Username already exists";
      } else {
        message = "Email address already exists";
      }
      return createSecureResponse(400, { message });
    }

    // Hash password and create user
    const hashedPass = await bcrypt.hash(sanitizedData.password, saltRounds);
    const userObj = new User({
      username: sanitizedData.username,
      email: sanitizedData.email,
      password: hashedPass,
      isSubscribed: sanitizedData.isSubscribed || false,
    });
    const newUser = await userObj.save();

    // Create related records
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

    // Try to send verification email (don't fail registration if email fails)
    try {
      await sendVerificationEmail(newUser._id, newUser.email);
      
      // Handle Mailchimp subscription if requested
      if (sanitizedData.isSubscribed) {
        try {
          await addSubscriber(newUser.email, sanitizedData.username, "", ["new-user", "mission-gaia"]);
        } catch (mailchimpError) {
          console.warn('Mailchimp subscription failed:', mailchimpError.message);
        }
      }

      return createSecureResponse(201, {
        message: "Registration successful! Please check your email to verify your account.",
        email: newUser.email,
      });
      
    } catch (emailError) {
      console.error('Email sending failed but user was created:', emailError.message);
      
      return createSecureResponse(201, {
        message: "Registration successful! However, there was an issue sending the verification email. Please contact support.",
        email: newUser.email,
        emailWarning: "Verification email could not be sent"
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
