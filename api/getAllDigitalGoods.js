const {
  getEntryByType,
  getImgURLFromAssetID,
} = require("./helpers/contentful");

exports.handler = async (event, context) => {
  try {
    const adoptablesData = await getEntryByType("digitalGood");
    const currencyData = await getEntryByType("currency");
    // console.log(data);
    const adoptables = sanitizeData(adoptablesData);
    const currencies = sanitizeData(currencyData);
    // console.log(missions);
    return {
      statusCode: 200,
      body: JSON.stringify({ adoptables, currencies }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

const sanitizeData = (data) => {
  const digitalItems = [];

  data.items.forEach((item) => {
    const { Asset } = data.includes;
    const { name, description, image, animation, price } = item.fields;

    // console.log(item);
    const digitalObj = {
      id: item.sys.id,
      name,
      description,
      image: getImgURLFromAssetID(image?.sys.id, Asset),
      price,
    };

    if (animation) {
      digitalObj.animation = getImgURLFromAssetID(animation?.sys.id, Asset);
    }

    digitalItems.push(digitalObj);
  });

  return digitalItems;
};
