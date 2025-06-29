// api/updateEmailPreferences.js
const { createConnection } = require("./helpers/connection");
const User = require("./models/user.model");
const { addSubscriber, removeSubscriber, updateSubscriber, addTagsToSubscriber } = require("./helpers/mailChimp");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { userID, email, isSubscribed, preferences = {} } = requestBody;

    await createConnection();

    // Update user in database
    const user = await User.findByIdAndUpdate(
      userID,
      { isSubscribed },
      { new: true }
    );

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Update Mailchimp subscription
    if (isSubscribed) {
      await addSubscriber(email, user.username, '', ['active-user']);
      
      // Add preference tags
      const tags = [];
      if (preferences.newFeatures) tags.push('new-features');
      if (preferences.contentReleases) tags.push('content-releases');
      if (preferences.announcements) tags.push('announcements');
      
      if (tags.length > 0) {
        await addTagsToSubscriber(email, tags);
      }
    } else {
      await removeSubscriber(email);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email preferences updated successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update email preferences" }),
    };
  }
};

// api/sendNewsletter.js
const { createCampaign, sendCampaign } = require("./helpers/mailChimp");

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { subject, content, fromName = "Mission G.A.I.A. Team", fromEmail = "updates@missiongaia.com" } = requestBody;

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1a4480, #16caca); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; }
          .cta-button { background: #16caca; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 Mission: G.A.I.A. Updates</h1>
          </div>
          <div class="content">
            ${content}
            <p><a href="https://missiongaia.com" class="cta-button">Continue Your Mission</a></p>
          </div>
          <div class="footer">
            <p>Keep saving the world, one mission at a time!</p>
            <p><small>Don't want these emails? <a href="*|UNSUB|*" style="color: #16caca;">Unsubscribe here</a></small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and send campaign
    const campaign = await createCampaign(subject, fromName, fromEmail, htmlContent);
    await sendCampaign(campaign.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Newsletter sent successfully",
        campaignId: campaign.id 
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send newsletter" }),
    };
  }
};

// api/getEmailStats.js
const { getSubscriber } = require("./helpers/mailChimp");
const mailchimp = require("@mailchimp/mailchimp_marketing");

exports.handler = async (event, context) => {
  try {
    const { MAILCHIMP_AUDIENCE_ID } = process.env;
    
    // Get list statistics
    const listStats = await mailchimp.lists.getList(MAILCHIMP_AUDIENCE_ID);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        totalSubscribers: listStats.stats.member_count,
        subscribedCount: listStats.stats.member_count,
        unsubscribedCount: listStats.stats.unsubscribe_count,
        cleanedCount: listStats.stats.cleaned_count
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to get email statistics" }),
    };
  }
};