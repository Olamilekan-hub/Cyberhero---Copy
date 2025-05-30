import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./reducers/pagesReducer";
import achievementsReducer from "./reducers/achievementsReducer";
import missionsReducer from "./reducers/missionsReducer";
import newsReducer from "./reducers/newsReducer";
import progressReducer from "./reducers/progressReducer";
import userReducer from "./reducers/userReducer";
import leaderboardReducer from "./reducers/leaderboardReducer";
import artReducer from "./reducers/artReducer";
import profileReducer from "./reducers/profileReducer";
import avatarsReducer from "./reducers/avatarsReducer";
import backgroundImagesReducer from "./reducers/backgroundImageReducer";
import goodsReducer from "./reducers/goodsReducer";
import cartReducer from "./reducers/cartReducer";
import currentMissionReducer from "./reducers/currentMissionReducer";
import currentBGReducer from "./reducers/currentBGReducer";
const reducers = {
  pages: pagesReducer,
  missions: missionsReducer,
  progress: progressReducer,
  news: newsReducer,
  achievements: achievementsReducer,
  user: userReducer,
  profile: profileReducer,
  leaderboard: leaderboardReducer,
  art: artReducer,
  avatars: avatarsReducer,
  backgroundImages: backgroundImagesReducer,
  goods: goodsReducer,
  cart: cartReducer,
  currentMission: currentMissionReducer,
  currentBG: currentBGReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
