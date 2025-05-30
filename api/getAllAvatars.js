const {
  getEntryByType,
  getImgURLFromAssetID,
} = require("./helpers/contentful");

exports.handler = async () => {
  try {
    const data = await getEntryByType("avatar");
    const avatars = sanitizeAvatarData(data);
    return {
      statusCode: 200,
      body: JSON.stringify(avatars),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

const sanitizeAvatarData = (data) => {
  const avatars = {};
  let title;
  data.items.forEach((item) => {
    item.fields?.avatars?.forEach((item1) => {
      const { Asset } = data.includes;
      data.includes.Asset.forEach((item2) => {
        if (item2?.sys?.id === item1?.sys?.id) title = item2?.fields?.title;
      });

      const avatarObj = {
        id: item1?.sys?.id,
        img: getImgURLFromAssetID(item1?.sys?.id, Asset),
        title,
      };
      avatars[item?.fields?.title] = avatars[item?.fields?.title] || [];
      avatars[item?.fields?.title].push(avatarObj);
    });
  });

  return avatars;
};
