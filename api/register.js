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

// Mailchimp
const { addSubscriber } = require("./helpers/mailChimp");
const { addTagsToSubscriber } = require("./helpers/mailChimp");

// Constants
const saltRounds = 10;

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();

    // Make sure this account doesn't already exist
    const existingUser = await User.findOne({
      $or: [{ email: requestBody.email }, { username: requestBody.username }],
    }).collation({ locale: "en", strength: 2 });

    // Check if the user already exists
    if (existingUser) {
      let message;
      if (
        existingUser.username.toLowerCase() ===
        requestBody.username.toLowerCase()
      ) {
        message = "Username already exists";
      } else {
        message = "Email address already exists";
      }

      return {
        statusCode: 400,
        body: JSON.stringify({ message }),
      };
    }

    // hash passwords and store user
    const hashedPass = await bcrypt.hash(requestBody.password, saltRounds);
    const userObj = new User({
      username: requestBody.username,
      email: requestBody.email,
      password: hashedPass,
      isSubscribed: requestBody.isSubscribed,
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

    if (requestBody.isSubscribed) {
      console.log("Adding to Mailchimp with enhanced data");

      // Add subscriber with more detailed information
      const mailchimpResult = await addSubscriber(
        newUser.email,
        requestBody.username, // firstName field
        "", // lastName (can be added to registration form)
        ["new-user", "mission-gaia"] // default tags
      );

      // Add additional tags based on user preferences
      if (mailchimpResult && !mailchimpResult.error) {
        const additionalTags = [];

        // You can add more preference checkboxes to registration
        if (requestBody.preferences?.newFeatures)
          additionalTags.push("new-features");
        if (requestBody.preferences?.contentUpdates)
          additionalTags.push("content-updates");
        if (requestBody.preferences?.announcements)
          additionalTags.push("announcements");

        // Add age-appropriate content tags
        if (requestBody.age) {
          if (requestBody.age >= 9 && requestBody.age <= 12) {
            additionalTags.push("target-age");
          }
        }

        if (additionalTags.length > 0) {
          await addTagsToSubscriber(newUser.email, additionalTags);
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "success",
        email: newUser.email,
      }),
    };
  } catch (error) {
    // console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
