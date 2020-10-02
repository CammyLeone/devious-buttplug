const app = require("express")();
const server = require("http").createServer(app);
import cors from "cors";
import store from "./store";
import { setFromServer, clientDisconnected, resetState } from "./shareSlice";

app.use(cors());
const options = {
  /* ... */
};
const io = require("socket.io")(server, options);

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

server.listen(process.env.PORT);
