import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "./shareSlice";

export default configureStore({
  reducer: {
    share: shareReducer,
  },
});
