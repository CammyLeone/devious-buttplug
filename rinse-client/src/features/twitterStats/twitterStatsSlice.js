import { createSlice } from "@reduxjs/toolkit";

const URL_BASE = process.env.REACT_APP_API_BASE_URL;
export const twitterStatsSlice = createSlice({
  name: "twitterStats",
  initialState: {
    isHydrated: false,
    error: null,
    likes: null,
    comments: null,
    retweets: null,
  },
  reducers: {
    apiDataReceived: (state, { payload }) => {
      state.isHydrated = true;
      state.likes = payload.likes;
      state.comments = payload.comments;
      state.retweets = payload.retweets;
    },
    apiError: (state, { payload }) => {
      state = {
        isHydrated: false,
        error: payload,
        likes: null,
        comments: null,
        retweets: null,
      };
    },
  },
});

const { apiDataReceived, apiError } = twitterStatsSlice.actions;

export const updateFromAPI = (conversationId) => async (dispatch) => {
  const url = `${URL_BASE}/twitter-stats-mock/${conversationId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return dispatch(apiError);
    const data = await response.json();
    dispatch(apiDataReceived(data));
  } catch (e) {
    dispatch(apiError(e.message));
  }
};

export const selectLikes = (state) => state.twitterStats.likes;
export const selectComments = (state) => state.twitterStats.comments;
export const selectRetweets = (state) => state.twitterStats.retweets;

export default twitterStatsSlice.reducer;
