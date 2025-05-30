const {
  getEntryByType,
  getImgURLFromAssetID,
} = require("./helpers/contentful");

exports.handler = async () => {
  try {
    const data = await getEntryByType("backgroundImg");
    const assets = sanitizeAvatarData(data);

    return {
      statusCode: 200,
      body: JSON.stringify(assets),
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
  const assets = {};
  let title;
  data.items.forEach((item) => {
    item.fields?.assets?.forEach((item1) => {
      const { Asset } = data.includes;
      data.includes.Asset.forEach((item2) => {
        if (item2?.sys?.id === item1?.sys?.id) title = item2?.fields?.title;
      });

      const avatarObj = {
        id: item1?.sys?.id,
        img: getImgURLFromAssetID(item1?.sys?.id, Asset),
        title,
      };
      assets[item?.fields?.title] = assets[item?.fields?.title] || [];
      assets[item?.fields?.title].push(avatarObj);
    });
  });

  return assets;
};
