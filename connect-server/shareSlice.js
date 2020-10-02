import { createSlice, createAction } from "@reduxjs/toolkit";

export const shareSlice = createSlice({
  name: "share",
  initialState: {
    group: null,
    locks: {},
    clients: {},
    sockets: {},
  },
  reducers: {
    lockAcquired: (state, { payload: { lockedId, holderId } }) => {
      state.locks[lockedId] = holderId;
    },
    lockReleased: (state, { payload: { lockedId } }) => {
      delete state.locks[lockedId];
    },
    clientConnected: (state, { payload: { socketId, id, name } }) => {
      state.sockets[socketId] = id;
      state.clients[id] = {};
      state.clients[id].socketId = socketId;
      state.clients[id].id = id;
      state.clients[id].name = name;
      state.clients[id].hasDevice = false;
    },
    clientDeviceState: (state, { payload: { id, hasDevice } }) => {
      // from socketio
      state.clients[id].hasDevice = hasDevice;
      state.clients[id].intensity = 0;
    },
    clientVibration: (state, { payload: { id, intensity } }) => {
      state.clients[id].intensity = intensity;
    },
    clientDisconnected: (state, { payload: { socketId } }) => {
      const clientId = state.sockets[socketId];
      delete state.clients[clientId];
      delete state.sockets[socketId];
    },
    resetState: (state) => {
      state.sockets = {};
      state.clients = {};
      state.locks = {};
    },
  },
});

export const { resetState, clientDisconnected } = shareSlice.actions;
export const setFromServer = createAction("share/setFromServer");
export default shareSlice.reducer;
