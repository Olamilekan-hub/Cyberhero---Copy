const { createConnection } = require("./helpers/connection");
const Progress = require("./models/progress.model");
const Achievement = require("./models/achievement.model");
let newBody;
exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);
    await createConnection();
    const { userID, contentfulID } = requestBody;
    if (!userID || !contentfulID) throw new Error("Invalid request body");

    const currentProgresses = await Progress.find({ userID });
    let currentProgress;
    if (currentProgresses)
      currentProgress = currentProgresses.find(
        (item) => item.contentfulID === contentfulID
      );

    if (requestBody.missionType === "Training")
      newBody = {
        ...requestBody,
        Training: {
          read: {
            ...currentProgress?.Training?.read,
            ...(requestBody.read ? { ...requestBody.articleID } : {}),
          },
          action: {
            ...currentProgress?.Training?.action,
            ...(requestBody.action ? { ...requestBody.articleID } : {}),
          },
          watch: {
            ...currentProgress?.Training?.watch,
            ...(requestBody.watch ? { ...requestBody.articleID } : {}),
          },
          create: {
            ...currentProgress?.Training?.create,
            ...(requestBody.create ? { ...requestBody.articleID } : {}),
          },
          quiz: {
            ...currentProgress?.Training?.quiz,
            ...(requestBody.quiz ? { ...requestBody.articleID } : {}),
          },
        },
      };
    else
      newBody = {
        ...requestBody,
        Global: {
          read: {
            ...currentProgress?.Global?.read,
            ...(requestBody.read ? { ...requestBody.articleID } : {}),
          },
          action: {
            ...currentProgress?.Global?.action,
            ...(requestBody.action ? { ...requestBody.articleID } : {}),
          },
          watch: {
            ...currentProgress?.Global?.watch,
            ...(requestBody.watch ? { ...requestBody.articleID } : {}),
          },
          create: {
            ...currentProgress?.Global?.create,
            ...(requestBody.create ? { ...requestBody.articleID } : {}),
          },
          quiz: {
            ...currentProgress?.Global?.quiz,
            ...(requestBody.quiz ? { ...requestBody.articleID } : {}),
          },
        },
      };

    let result = await Progress.findOneAndUpdate(
      {
        userID,
        contentfulID,
      },
      newBody,
      {
        upsert: true,
        setDefaultsOnInsert: true,
        omitUndefined: true,
        new: true,
      }
    );
    // award XP based on task that was completed
    const achievementState = await Achievement.findOneAndUpdate(
      { userID },
      {
        xp: await xpAwardCalculation(requestBody),
      },
      {
        new: true,
      }
    );

    // update completion status if all tasks are done
    if (allTasksCompleteCheck(result)) {
      result = await Progress.findByIdAndUpdate(
        result._id,
        { complete: true },
        {
          new: true,
        }
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

const allTasksCompleteCheck = (doc) => {
  if (doc.quiz) return true;
};

const xpAwardCalculation = async (requestBody) => {
  const currentProgress = await Progress.find({ userID: requestBody.userID });
  let sum = 0;
  const mode = ["Global", "Training"];
  const category = { read: 2, action: 6, watch: 2, create: 4, quiz: 10 };
  console.log("00000000000000000000000000000", currentProgress);
  currentProgress.map((progress) => {
    mode.map((md) => {
      Object.keys(category).map((ct, index) => {
        if (index < Object.keys(category).length) {
          Object.values(progress?.[`${md}`]?.[`${ct}`]).map((item, j) => {
            if (j < Object.values(progress?.[`${md}`]?.[`${ct}`]).length - 1) {
              if (
                ct === "quiz" &&
                progress.quiz &&
                !item &&
                md === progress.missionType
              )
                sum -= category[`${ct}`] / 2;
              else sum += item * category[`${ct}`];
            }
          });
        }
      });
    });
  });
  return sum;
};
