const {
  getEntryByType,
  getImgURLFromAssetID,
  getPreviewByType,
} = require("./helpers/contentful");

exports.handler = async (event, context) => {
  try {
    const data = await getPreviewByType("mission");
    const missionData = await getEntryByType("mission");
    const contentBox = await getEntryByType("contentBox");
    const missions = sanitizeMissionData(data, missionData, contentBox);
    return {
      statusCode: 200,
      body: JSON.stringify({ missions }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

const sanitizeMissionData = (data, missionData, contentBox) => {
  let missions = [];
  console.log(missionData.items.length, data.items.length, contentBox.items.length);
  data.items.forEach((item) => {
    const { Asset } = data?.includes;
    const {
      name,
      missionType,
      smallIcon,
      largeImage,
      quizIcon,
      backgroundImg,
      animation,
      premium,
      price,
      taskEventBG,
      taskQuizQuestion1,
      taskQuizAnswers1,
      taskQuizQuestion1CorrectAnswer,
      taskQuizQuestion2,
      taskQuizAnswers2,
      taskQuizQuestion2CorrectAnswer,
      taskQuizQuestion3,
      taskQuizAnswers3,
      taskQuizQuestion3CorrectAnswer,
      taskQuizQuestion4,
      taskQuizAnswers4,
      taskQuizQuestion4CorrectAnswer,
      taskQuizQuestion5,
      taskQuizAnswers5,
      taskQuizQuestion5CorrectAnswer,
      taskQuizQuestion6,
      taskQuizAnswers6,
      taskQuizQuestion6CorrectAnswer,
      articleGroup,
    } = item?.fields;

    const publishedAt = item?.sys.publishedAt;
    const articleData = [];
    articleGroup?.map((item1) => {
      contentBox?.items?.map((item2) => {
        if (item2?.sys?.id === item1?.sys?.id) articleData.push(item2?.fields);
      });
    });
    const missionObj = {
      id: item?.sys?.id,
      name: name,
      missionType: missionType ? "Training" : "Global",
      published : publishedAt ? true : false,
      smallIcon: getImgURLFromAssetID(smallIcon?.sys?.id, Asset),
      largeIcon: getImgURLFromAssetID(largeImage?.sys?.id, Asset),
      quizIcon: getImgURLFromAssetID(quizIcon?.sys?.id, Asset),
      backgroundImg: getImgURLFromAssetID(backgroundImg?.sys?.id, Asset),
      animation: getImgURLFromAssetID(animation?.sys?.id, Asset),
      premium,
      price,
      tasks: {
        event: getImgURLFromAssetID(taskEventBG?.sys?.id, Asset),
        quiz: [
          {
            question: taskQuizQuestion1,
            options: taskQuizAnswers1,
            correctIndex: taskQuizQuestion1CorrectAnswer - 1,
          },
          {
            question: taskQuizQuestion2,
            options: taskQuizAnswers2,
            correctIndex: taskQuizQuestion2CorrectAnswer - 1,
          },
          {
            question: taskQuizQuestion3,
            options: taskQuizAnswers3,
            correctIndex: taskQuizQuestion3CorrectAnswer - 1,
          },
          {
            question: taskQuizQuestion4,
            options: taskQuizAnswers4,
            correctIndex: taskQuizQuestion4CorrectAnswer - 1,
          },
          {
            question: taskQuizQuestion5,
            options: taskQuizAnswers5,
            correctIndex: taskQuizQuestion5CorrectAnswer - 1,
          },
          {
            question: taskQuizQuestion6,
            options: taskQuizAnswers6,
            correctIndex: taskQuizQuestion6CorrectAnswer - 1,
          },
        ],
      },
      articleGroup: articleData,
    };
    missions.push(missionObj);
  });
  missions = missions.sort((leftMission, rightMission) => rightMission.published - leftMission.published)
  missions.push({ assets: data.includes });
  missions.push({ assets: data });

  return missions;
};
