import { configureStore } from "@reduxjs/toolkit";
import twitterStatsReducer from "../features/twitterStats/twitterStatsSlice";

export default configureStore({
  reducer: {
    twitterStats: twitterStatsReducer,
  },
});
