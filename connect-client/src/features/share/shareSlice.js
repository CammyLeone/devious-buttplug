import { createSlice } from "@reduxjs/toolkit";

export const shareSlice = createSlice({
  name: "share",
  initialState: {
    clients: {
      // "2382j23": {
      //   isMe: true,
      //   name: "Cammy",
      //   hasDevice: true,
      //   intensity: 0,
      // },
      "983hq923h": {
        isMe: false,
        name: "Quinn",
        hasDevice: true,
        intensity: 0,
      },
      "1hiu2hu219": {
        isMe: false,
        name: "Marcia",
        hasDevice: false,
      },
    },
  },
  reducers: {
    clientConnected: (state, { payload: { id, name, isMe = false } }) => {
      // from socketio
      // go outward if dispatched locally
      state.clients[id] = { name, hasDevice: false, isMe };
    },
    clientDisconnected: (state, { payload: { id } }) => {
      // from socketio
      delete state.clients[id];
    },
    clientDeviceState: (state, { payload: { id, hasDevice } }) => {
      // from socketio
      state.clients[id].hasDevice = hasDevice;
      state.clients[id].intensity = 0;
    },
    clientVibration: (state, { payload: { id, intensity } }) => {
      state.clients[id].intensity = intensity;
    },
  },
});

export const {
  clientConnected,
  clientDisconnected,
  clientDeviceState,
  clientVibration,
} = shareSlice.actions;

export const selectMe = (state) =>
  Object.values(state.share.clients).find((c) => c.isMe);
export const selectOthers = (state) =>
  Object.values(state.share.clients).filter((c) => !c.isMe);

export default shareSlice.reducer;
