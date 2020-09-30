import { configureStore } from "@reduxjs/toolkit";
import shareReducer from "../features/share/shareSlice";

export default configureStore({
  reducer: {
    share: shareReducer,
  },
});
