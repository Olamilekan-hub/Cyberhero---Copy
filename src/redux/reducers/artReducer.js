import { createReducer } from "@reduxjs/toolkit";
import {
  fetchUserArt,
  fetchFavoriteArts,
  fetchCommunityArts,
} from "../actions/artActions";

const initialState = {
  userArt: [],
  userArtLoading: false,
  userArtError: null,
  favoriteArt: [],
  favoriteArtLoading: false,
  favoriteArtError: null,
  communityArt: [],
  communityArtLoading: false,
  communityArtError: null,
};
const artReducer = createReducer(initialState, {
  [fetchUserArt.fulfilled]: (state, action) => {
    state.userArt = action.payload;
    state.userArtLoading = false;
    state.userArtError = null;
  },
  [fetchUserArt.pending]: (state, action) => {
    state.userArtLoading = true;
    state.userArtError = null;
  },
  [fetchUserArt.rejected]: (state, action) => {
    state.userArtLoading = false;
    state.userArtError = action.error;
  },
  [fetchFavoriteArts.fulfilled]: (state, action) => {
    state.favoriteArt = action.payload;
    state.favoriteArtLoading = false;
    state.favoriteArtError = null;
  },
  [fetchFavoriteArts.pending]: (state, action) => {
    state.favoriteArtLoading = true;
    state.favoriteArtError = null;
  },
  [fetchFavoriteArts.rejected]: (state, action) => {
    state.favoriteArtLoading = false;
    state.favoriteArtError = action.error;
  },
  [fetchCommunityArts.fulfilled]: (state, action) => {
    state.communityArt = action.payload;
    state.communityArtLoading = false;
    state.communityArtError = null;
  },
  [fetchCommunityArts.pending]: (state, action) => {
    state.communityArtLoading = true;
    state.communityArtError = null;
  },
  [fetchCommunityArts.rejected]: (state, action) => {
    state.fetchCommunityArts = false;
    state.communityArtError = action.error;
  },
});

export default artReducer;
