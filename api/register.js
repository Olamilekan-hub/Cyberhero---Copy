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
      console.log("Adding to Mailchimp");
      // Add to Mailchimp
      await addSubscriber(newUser.email);
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
