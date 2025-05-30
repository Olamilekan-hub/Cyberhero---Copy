const {
  getEntryByType,
  getImgURLFromAssetID,
} = require("./helpers/contentful");

exports.handler = async (event, context) => {
  try {
    const data = await getEntryByType("page");
    const pages = sanitizePagesData(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ pages }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

const sanitizePagesData = (data) => {
  const pages = [];
  data.items.forEach((item) => {
    const { Asset } = data?.includes;
    const { type, title, subTitle, text, video, image } = item.fields;

    const pageObj = {
      id: item.sys.id,
      type,
      title,
      subTitle,
      text,
      video: getImgURLFromAssetID(video?.sys?.id, Asset),
      image: getImgURLFromAssetID(image?.sys?.id, Asset),
    };
    pages.push(pageObj);
  });

  return pages;
};
