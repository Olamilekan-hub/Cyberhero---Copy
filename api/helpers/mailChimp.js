const mailchimp = require("@mailchimp/mailchimp_marketing");

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } =
  process.env;

if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
  throw new Error(
    "Mailchimp API key, server prefix, and audience ID must be set in environment variables"
  );
}

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

// Add a new subscriber
const addSubscriber = async (email, firstName = '', lastName = '', tags = []) => {
  try {
    const response = await mailchimp.lists.addListMember(
      MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags: tags
      }
    );
    console.log(`Successfully added subscriber: ${email}`);
    return response;
  } catch (error) {
    console.error("Error adding subscriber:", error);
    // Don't throw error to prevent registration failure
    return { error: error.message };
  }
};

// Update subscriber information
const updateSubscriber = async (email, updates) => {
  try {
    const subscriberHash = mailchimp.utils.md5(email.toLowerCase());
    const response = await mailchimp.lists.updateListMember(
      MAILCHIMP_AUDIENCE_ID,
      subscriberHash,
      updates
    );
    return response;
  } catch (error) {
    console.error("Error updating subscriber:", error);
    throw error;
  }
};

// Add tags to subscriber
const addTagsToSubscriber = async (email, tags) => {
  try {
    const subscriberHash = mailchimp.utils.md5(email.toLowerCase());
    const response = await mailchimp.lists.updateListMemberTags(
      MAILCHIMP_AUDIENCE_ID,
      subscriberHash,
      {
        tags: tags.map(tag => ({ name: tag, status: "active" }))
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding tags:", error);
    throw error;
  }
};

// Remove subscriber
const removeSubscriber = async (email) => {
  try {
    const subscriberHash = mailchimp.utils.md5(email.toLowerCase());
    const response = await mailchimp.lists.updateListMember(
      MAILCHIMP_AUDIENCE_ID,
      subscriberHash,
      {
        status: "unsubscribed"
      }
    );
    return response;
  } catch (error) {
    console.error("Error removing subscriber:", error);
    throw error;
  }
};

// Get subscriber info
const getSubscriber = async (email) => {
  try {
    const subscriberHash = mailchimp.utils.md5(email.toLowerCase());
    const response = await mailchimp.lists.getListMember(
      MAILCHIMP_AUDIENCE_ID,
      subscriberHash
    );
    return response;
  } catch (error) {
    console.error("Error getting subscriber:", error);
    return null;
  }
};

// Send campaign to specific segment
const sendCampaign = async (campaignId) => {
  try {
    const response = await mailchimp.campaigns.send(campaignId);
    return response;
  } catch (error) {
    console.error("Error sending campaign:", error);
    throw error;
  }
};

// Create a campaign
const createCampaign = async (subject, fromName, fromEmail, htmlContent, textContent = '') => {
  try {
    const campaign = await mailchimp.campaigns.create({
      type: "regular",
      recipients: {
        list_id: MAILCHIMP_AUDIENCE_ID
      },
      settings: {
        subject_line: subject,
        from_name: fromName,
        reply_to: fromEmail,
        to_name: "Mission G.A.I.A. Hero"
      }
    });

    // Set campaign content
    await mailchimp.campaigns.setContent(campaign.id, {
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    });

    return campaign;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

module.exports = { 
  addSubscriber, 
  updateSubscriber, 
  addTagsToSubscriber, 
  removeSubscriber, 
  getSubscriber,
  sendCampaign,
  createCampaign 
};