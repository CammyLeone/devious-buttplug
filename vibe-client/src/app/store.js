import { configureStore } from "@reduxjs/toolkit";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import shareReducer from "../features/share/shareSlice";

const API_URL = process.env.REACT_APP_API_BASE_URL;

let socket = io(API_URL);
let socketIoMiddleware = createSocketIoMiddleware(socket, "share/client");

export default configureStore({
  reducer: {
    share: shareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIoMiddleware),
});
