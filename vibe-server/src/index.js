import cors from "cors";
import store from "./store";
import { setFromServer, clientDisconnected, resetState } from "./shareSlice";

import path from "path";
import express from "express";
import socketio from "socket.io";
import http from "http";
import https from "https";
import fs from "fs";

const app = express();
app.use(cors());
const io = socketio();
const server = http.createServer(app);

io.attach(server);
io.on("connection", (socket) => {
  socket.on("action", (data) => {
    console.log("action received!", data);
    data.payload.socketId = socket.id;
    store.dispatch(data);
    console.log(JSON.stringify(store.getState(), null, 2));
    io.sockets.emit("action", setFromServer(store.getState().share));
  });

  socket.on("disconnect", () => {
    console.log(`disconnecting: ${socket.id}`);
    store.dispatch(clientDisconnected({ socketId: socket.id }));
    console.log(JSON.stringify(store.getState(), null, 2));
    io.sockets.emit("action", setFromServer(store.getState().share));
  });
});

app.get("/hydrate", (req, res) => {
  res.json(store.getState().share);
});

app.get("/start-over", (req, res) => {
  store.dispatch(resetState());
  res.json(store.getState().share);
});

server.listen(80, () => {
  console.log("HTTP server running on port 80");
});

if (process.env.NODE_ENV === "production") {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("./ssl/privkey.pem"),
      cert: fs.readFileSync("./ssl/fullchain.pem"),
    },
    app
  );

  io.attach(httpsServer);

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
}
