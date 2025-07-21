const contentful = require("contentful");
const fetch = require("node-fetch");
const envValidator = require("./envValidator");

try {
  envValidator.validateRequired();
} catch (error) {
  throw new Error(`Contentful configuration error: ${error.message}`);
}

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_PREVIEW_URL,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_ENV_ID,
} = process.env;

const createClient = () => {
  try {
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    return client;
  } catch (error) {
    throw new Error('Content management system initialization failed');
  }
};

const getEntryByType = async (type) => {
  try {
    const url = `${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=${type}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Content fetch failed with status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    const sanitizedError = envValidator.getSanitizedError(error, 'Content fetch failed');
    throw new Error(sanitizedError);
  }
};

const getPreviewByType = async (type) => {
  try {
    const url = `${CONTENTFUL_PREVIEW_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENV_ID}/entries?access_token=${CONTENTFUL_PREVIEW_TOKEN}&content_type=${type}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Content preview failed with status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    const sanitizedError = envValidator.getSanitizedError(error, 'Content preview failed');
    throw new Error(sanitizedError);
  }
};

const getImgURLFromAssetID = (asset_id, assets) => {
  const filteredArr = assets.filter((asset) => asset?.sys?.id === asset_id);
  return filteredArr[0]?.fields?.file?.url;
};

module.exports = { createClient, getEntryByType, getImgURLFromAssetID, getPreviewByType };