import { createSlice, createAction } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const shareSlice = createSlice({
  name: "share",
  initialState: {
    me: null,
    group: null,
    locks: {},
    clients: {},
  },
  reducers: {
    setMe: (state, { payload: { id } }) => {
      state.me = id;
    },
    newSession: (state, { payload }) => {
      state.group = payload;
    },
    setFromServer: (state, { payload }) => {
      state.locks = payload.locks;
      state.clients = payload.clients;
    },
  },
});

export const { setMe, newSession } = shareSlice.actions;

export const lockAcquired = createAction("share/lockAcquired");
export const lockReleased = createAction("share/lockReleased");
export const clientConnected = createAction("share/clientConnected");
export const clientDeviceState = createAction("share/clientDeviceState");
export const clientVibration = createAction("share/clientVibration");

const { setFromServer } = shareSlice.actions;
export const initFromServer = () => async (dispatch) => {
  const response = await fetch(`${API_URL}/hydrate`);
  const data = await response.json();
  dispatch(setFromServer(data));
};

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
