export const GetRequest = async (url) => {
  try {
    const response = await fetch(url);
    return await statusCheck(response);
  } catch (error) {
    throw error;
  }
};

export const PostRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return await statusCheck(response);
  } catch (error) {
    throw error;
  }
};

const statusCheck = async (response) => {
  try {
    // console.log(response);
    const res = await response.json();
    // console.log(res);
    if (response.status !== 200)
      throw new Error(res.message ? res.message : res);

    return res.payload ? res.payload : res;
  } catch (error) {
    // console.log("in statusCheck", error);
    throw error;
  }
};
