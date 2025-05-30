// BE SURE TO CHANGE XP VALUE IN API
export const xpValues = {
  read: 2,
  watch: 2,
  create: 4,
  action: 6,
  quiz: 10,
};

export const powerValues = {
  read: 1,
  watch: 1,
  create: 2,
  action: 3,
  quiz: 5,
};

export const xpTotals = () =>
  xpValues.read * 6 +
  xpValues.watch * 6 +
  xpValues.create * 6 +
  xpValues.action * 6 +
  xpValues.quiz * 6;

export const powerTotals = () =>
  powerValues.read * 6 +
  powerValues.watch * 6 +
  powerValues.create * 6 +
  powerValues.action * 6 +
  powerValues.quiz * 6;

const CategoryEnums = ["read", "watch", "create", "action"];

export const calculateUserTotals = (progressObj, missionType) => {
  let userXP = 0;
  let xpObj = progressObj?.[`${missionType}`];

  for (const category of CategoryEnums) {
    const categoryObj = xpObj?.[category];
    let categoryXP = 0;

    for (const key in categoryObj) {
      if (categoryObj[key]) {
        categoryXP += xpValues[category] * Number(categoryObj[`${key}`]);
      }
    }

    userXP += categoryXP;
  }
  if (progressObj?.quiz)
    for (const key in xpObj?.quiz) {
      if (xpObj?.quiz?.[`${key}`]) userXP += xpValues.quiz;
      else userXP -= xpValues.quiz / 2;
    }
  return userXP;
};

export const calculateUserPowerAndCoin = (progressObj, mode) => {
  if (
    (progressObj?.missionType === "Training" && mode === "coin") ||
    (progressObj?.missionType === "Global" && mode === "power")
  )
    return 0;
  let userPower = 0;
  let missionType = mode === "power" ? "Training" : "Global";
  let powerObj = progressObj?.[`${missionType}`];
  for (const category of CategoryEnums) {
    const categoryObj = powerObj?.[category];
    let categoryPower = 0;

    for (const key in categoryObj) {
      if (categoryObj[key]) {
        categoryPower += powerValues[category] * Number(categoryObj[`${key}`]);
      }
    }

    userPower += categoryPower;
  }
  if (progressObj?.quiz) {
    for (const key in powerObj?.quiz) {
      if (powerObj?.quiz?.[`${key}`]) userPower += powerValues.quiz;
      else {
        if (missionType === "Training") userPower -= powerValues.quiz - 2;
        else userPower -= powerValues.quiz - 3;
      }
    }
  }
  return userPower;
};

export const createColors = [
  "black",
  "white",
  "grey",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "darkviolet",
  "violet",
];

export const navHeight = 80;
