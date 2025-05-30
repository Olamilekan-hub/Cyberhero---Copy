import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetRequest, PostRequest } from "../../utils/fetchFunctions";

const fetchUserArt = createAsyncThunk("art/fetchUserArt", async (userID) => {
  const url = `/.netlify/functions/getUserArt?userID=${userID}`;
  const response = await GetRequest(url);
  // console.log(response);
  return response;
});

const fetchFavoriteArts = createAsyncThunk(
  "art/fetchFavoriteArts",
  async (userID) => {
    const url = `/.netlify/functions/getFavoriteArt?userID=${userID}`;
    const response = await GetRequest(url);
    // console.log("fetchFavArt", response);
    return response;
  }
);

const fetchCommunityArts = createAsyncThunk(
  "art/fetchCommunityArts",
  async () => {
    const url = "/.netlify/functions/getRandomArt";
    const response = await GetRequest(url);
    // console.log("fetchCommunityArts", response);
    return response;
  }
);

const createNewArt = async (body) => {
  try {
    const url = `/.netlify/functions/newArt`;
    const response = await PostRequest(url, body);
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

const favoriteArt = async (body) => {
  try {
    const url = `/.netlify/functions/favoriteArt`;
    const response = await PostRequest(url, body);
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

const togglePublicArt = async (body) => {
  try {
    const url = `/.netlify/functions/toggleArtPublicListed`;
    const response = await PostRequest(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteArt = async (body) => {
  try {
    const url = `/.netlify/functions/deleteArt`;
    const response = await PostRequest(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchUserArt,
  fetchFavoriteArts,
  fetchCommunityArts,
  createNewArt,
  favoriteArt,
  togglePublicArt,
  deleteArt,
};
