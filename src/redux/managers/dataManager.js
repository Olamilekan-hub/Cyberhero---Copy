import { fetchAllMissions } from "../actions/missionsActions";
import { fetchAllNews } from "../actions/newsActions";
import { fetchAllProgress } from "../actions/progressActions";
import { fetchAchievements } from "../actions/achievementsActions";
import {
  fetchLeaderboards,
  getLeaderboardPosition,
} from "../actions/leaderboardActions";
import { setLS } from "./localStorage";
import {
  fetchUserArt,
  fetchFavoriteArts,
  fetchCommunityArts,
} from "../actions/artActions";
import { fetchProfile, updateProfile } from "../actions/profileActions";
import { updateUserName } from "../actions/userActions";
import { fetchAllAvatars } from "../actions/avatarsActions";
import { fetchAllBackgroundImages } from "../actions/backgroundImageActions";
import { fetchAllGoods } from "../actions/goodsActions";
import { getUser } from "../actions/userActions";

export const onLogin = () => {
  return async (dispatch, getState) => {
    try {
      const { token, userID, email } = getState().user.data;

      // set LocalStorage Data
      setLS({ token, userID, email });

      // Fetch user data
      const promises = [
        dispatch(fetchAllMissions()),
        dispatch(fetchAllBackgroundImages()),
        dispatch(fetchAllNews()),
        dispatch(fetchAllAvatars()),
        dispatch(fetchAllGoods()),
        dispatch(fetchAllProgress(userID)),
        dispatch(fetchAchievements()),
        dispatch(fetchLeaderboards()),
        dispatch(getLeaderboardPosition(userID)),
        dispatch(fetchUserArt(userID)),
        dispatch(fetchFavoriteArts(userID)),
        dispatch(fetchCommunityArts()),
        dispatch(fetchProfile(userID)),
        dispatch(getUser(userID)),
      ];
      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

export const onTaskCompletion = () => {
  return async (dispatch, getState) => {
    try {
      const { userID } = getState().user.data;

      // Fetch relevant updated progress data
      const promises = [
        dispatch(fetchAllProgress(userID)),
        dispatch(fetchAchievements(userID)),
      ];

      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// send undefined for either value if not included
export const onProfileUpdate = (bio, avatarID, petID) => {
  return async (dispatch, getState) => {
    try {
      const { userID } = getState().user.data;
      const profileObj = {
        bio,
        avatarID,
        petID,
        userID,
      };

      await dispatch(updateProfile(profileObj));
      return await dispatch(fetchProfile(userID));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const onUserNameUpdate = (username) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user.data;
      const profileObj = {
        token,
        username,
      };

      await dispatch(updateUserName(profileObj));
      // return await dispatch(fetchProfile(userID));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
