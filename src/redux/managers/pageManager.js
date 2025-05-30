import { fetchAllPages } from "../actions/pagesActions";

export const onLanding = () => {
  return async (dispatch, getState) => {
    try {
      const result = await dispatch(fetchAllPages());
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};
