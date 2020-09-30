import { createSlice } from "@reduxjs/toolkit";

export const shareSlice = createSlice({
  name: "share",
  initialState: {
    me: null,
    group: null,
    locks: {},
    clients: {
      // "2382j23": {
      //   isMe: true,
      //   name: "Cammy",
      //   hasDevice: true,
      //   intensity: 0,
      // },
      "983hq923h": {
        name: "Quinn",
        hasDevice: true,
        intensity: 0,
      },
      "1hiu2hu219": {
        name: "Marcia",
        hasDevice: false,
      },
    },
  },
  reducers: {
    setMe: (state, { payload: { id } }) => {
      state.me = id;
    },
    newSession: (state, { payload }) => {
      state.group = payload;
    },
    lockAcquired: (state, { payload: { lockedId, holderId } }) => {
      state.locks[lockedId] = holderId;
    },
    lockReleased: (state, { payload: { lockedId } }) => {
      delete state.locks[lockedId];
    },
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
  setMe,
  newSession,
  clientDisconnected,
  clientDeviceState,
  clientVibration,
} = shareSlice.actions;
const { clientConnected } = shareSlice.actions;

export const join = ({ id, name }) => (dispatch) => {
  dispatch(setMe({ id }));
  dispatch(clientConnected({ id, name }));
};

export const selectMe = (state) => state.share.clients[state.share.me];
export const selectOthers = (state) =>
  Object.keys(state.share.clients)
    .filter((id) => id !== state.share.me)
    .map((id) => state.share.clients[id]);

export default shareSlice.reducer;
