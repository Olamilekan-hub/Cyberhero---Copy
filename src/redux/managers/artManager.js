import {
  createNewArt,
  deleteArt,
  favoriteArt,
  fetchFavoriteArts,
  fetchUserArt,
} from "../actions/artActions";

export const onArtCompletion = (content, share) => {
  return async (dispatch, getState) => {
    try {
      const { userID } = getState().user.data;
      const body = {
        userID,
        content,
        public: share || false,
      };
      await createNewArt(body);
      const fetchRes = await dispatch(fetchUserArt(userID));
      return fetchRes;
    } catch (error) {
      throw error;
    }
  };
};

export const onArtFavorite = (artID, addFavorite) => {
  return async (dispatch, getState) => {
    try {
      const { userID } = getState().user.data;
      const body = {
        artID,
        userID,
        addFavorite,
      };
      await favoriteArt(body);
      const fetchRes = await dispatch(fetchFavoriteArts(userID));
      return fetchRes;
    } catch (error) {
      throw error;
    }
  };
};
export const onArtDeletion = (artID) => {
  return async (dispatch, getState) => {
    try {
      const { userID } = getState().user.data;
      const body = {
        artID,
        userID,
      };

      await deleteArt(body);
      const fetchRes = await dispatch(fetchUserArt(userID));
      return fetchRes;
    } catch (error) {
      throw error;
    }
  };
};
