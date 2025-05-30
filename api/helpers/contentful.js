const contentful = require("contentful");
const fetch = require("node-fetch");
const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_PREVIEW_URL,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_ENV_ID,
} = process.env;

const createClient = () => {
  const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  });

  return client;
};

// type is string pass-in of content_type
const getEntryByType = async (type) => {
  try {
    const url = `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=${type}`;
    const res = await fetch(url);
    console.log(url)
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getPreviewByType = async (type) => {
  try {
    const url = `${CONTENTFUL_PREVIEW_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV_ID}/entries?access_token=${CONTENTFUL_PREVIEW_TOKEN}&content_type=${type}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(url)
    return data;
  } catch (error) {
    throw error;
  }
}

const getImgURLFromAssetID = (asset_id, assets) => {
  const filteredArr = assets.filter((asset) => asset?.sys?.id === asset_id);
  //   console.log("filteredArray", filteredArr);
  return filteredArr[0]?.fields?.file?.url;
};

module.exports = { createClient, getEntryByType, getImgURLFromAssetID, getPreviewByType };
