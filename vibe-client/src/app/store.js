import { configureStore } from "@reduxjs/toolkit";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import shareReducer from "../features/share/shareSlice";

let socket = io("http://localhost:4000");
let socketIoMiddleware = createSocketIoMiddleware(socket, "share/client");

export default configureStore({
  reducer: {
    share: shareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIoMiddleware),
});
