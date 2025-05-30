const {
  getEntryByType,
  getImgURLFromAssetID,
} = require("./helpers/contentful");

exports.handler = async (event, context) => {
  try {
    const data = await getEntryByType("news");
    // console.log(data);
    const news = sanitizeNewsData(data);
    // console.log(missions);
    return {
      statusCode: 200,
      body: JSON.stringify({ news }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

const sanitizeNewsData = (data) => {
  const news = [];

  data.items.forEach((item) => {
    const { Asset } = data.includes;
    const { title, img, url } = item.fields;
    const newsObj = {
      id: item.sys.id,
      title,
      url,
      img: getImgURLFromAssetID(img.sys.id, Asset),
    };

    news.push(newsObj);
  });

  return news;
};
