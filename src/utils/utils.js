import { navHeight } from "../constants/constants";
var Filter = require("bad-words"),
  filter = new Filter();
// returns current level and percentage to next level
export const getLevelFromXP = (xp) => {
  // How much xp it takes for one level
  const perLevel = 100;

  // floors to nearest whole number
  const currentLevel = xp / perLevel;
  let level = Math.floor(currentLevel);
  if (level === 0) {
    level = 1;
  }
  // creates a whole number that acts as percentage
  // of the remainder amount (ex. 90)
  const remainder = xp % perLevel;
  const percentageToNextLevel = (remainder / perLevel) * 100;

  return { level, percentageToNextLevel };
};

export const scrollToTop = () => {
  document.body.scrollTop = navHeight; // For Safari
  document.documentElement.scrollTop = navHeight; // For Chrome, Firefox, IE and Opera
};

export const checkForNaughtyWords = (str) => {
  return filter.isProfane(str);
};

export const sortByMissionType = (missionsArr) => {
  let trainingMissions = [];
  let globalMissions = [];
  // console.log("missionsArr", missionsArr);
  missionsArr.forEach((mission) => {
    if (mission.missionType === "Training") {
      trainingMissions.push(mission);
    } else {
      globalMissions.push(mission);
    }
  });

  return {
    trainingMissions,
    globalMissions,
  };
};
