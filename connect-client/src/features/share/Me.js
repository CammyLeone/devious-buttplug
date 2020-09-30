import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConnectAToy, useVibration } from "react-buttplug";

import getClientId from "../../getClientId";
import {
  selectMe,
  clientConnected,
  clientDisconnected,
  clientDeviceState,
} from "./shareSlice";

export default function Me() {
  const me = useSelector(selectMe);
  if (!me) return <NewMe />;

  return <ConnectedMe me={me} />;
}

function ConnectedMe({ me }) {
  const { id, name, hasDevice, intensity } = me;
  const dispatch = useDispatch();
  const [device, setDevice] = useState(null);

  const newDevice = useCallback(
    (device) => {
      setDevice(device);
      dispatch(clientDeviceState(id, true));
    },
    [id, dispatch]
  );
  useVibration(device, intensity);

  useEffect(() => {
    return () => dispatch(clientDisconnected(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>{name}</h1>
      {!hasDevice && (
        <ConnectAToy
          render={({ initiateConnection }) => (
            <button onClick={initiateConnection}>Make it Interesting</button>
          )}
          onNewDevice={newDevice}
        />
      )}
    </div>
  );
}

function NewMe() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button
        onClick={() =>
          dispatch(clientConnected({ id: getClientId(), name, isMe: true }))
        }
      >
        Join
      </button>
    </div>
  );
}
