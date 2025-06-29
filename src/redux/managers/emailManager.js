// src/redux/managers/emailManager.js
import { updateEmailPreferences, sendNewsletter } from "../actions/emailActions";

export const onEmailPreferencesUpdate = (preferences) => {
  return async (dispatch, getState) => {
    try {
      const { userID, email } = getState().user.data;
      const payload = {
        userID,
        email,
        ...preferences
      };
      
      const result = await dispatch(updateEmailPreferences(payload));
      return result;
    } catch (error) {
      console.error("Email preferences update error:", error);
      throw error;
    }
  };
};

export const onNewsletterSend = (newsletterData) => {
  return async (dispatch) => {
    try {
      const result = await dispatch(sendNewsletter(newsletterData));
      return result;
    } catch (error) {
      console.error("Newsletter send error:", error);
      throw error;
    }
  };
};

// Automated email triggers
export const onMissionComplete = (missionName, userEmail) => {
  return async (dispatch) => {
    try {
      // Send congratulations email for mission completion
      const emailContent = `
        <h2>🎉 Congratulations, Hero!</h2>
        <p>You've successfully completed the <strong>${missionName}</strong> mission!</p>
        <p>Your dedication to saving the planet is truly inspiring. Keep up the amazing work!</p>
        <p>Ready for your next adventure? Log in to Mission: G.A.I.A. to continue your journey.</p>
      `;
      
      const newsletterData = {
        subject: `🌍 Mission Complete: ${missionName}`,
        content: emailContent
      };
      
      return await dispatch(sendNewsletter(newsletterData));
    } catch (error) {
      console.error("Mission completion email error:", error);
    }
  };
};

export const onLevelUp = (level, userEmail) => {
  return async (dispatch) => {
    try {
      const emailContent = `
        <h2>⭐ Level Up Achievement!</h2>
        <p>Incredible work! You've reached <strong>Level ${level}</strong>!</p>
        <p>Your skills as an environmental hero are growing stronger every day.</p>
        <p>New challenges and adventures await you at this level. Continue your mission to save G.A.I.A.!</p>
      `;
      
      const newsletterData = {
        subject: `🎊 You've Reached Level ${level}!`,
        content: emailContent
      };
      
      return await dispatch(sendNewsletter(newsletterData));
    } catch (error) {
      console.error("Level up email error:", error);
    }
  };
};