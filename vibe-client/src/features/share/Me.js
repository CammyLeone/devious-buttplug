import React, { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConnectAToy, useVibration } from "react-buttplug";
import { Chip, Section, SectionButton, Text } from "../../layout";

import getClientId from "../../getClientId";
import { selectMe, join, clientDeviceState } from "./shareSlice";

export default function Me() {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);

  if (!me)
    return (
      <NewMe onJoin={(name) => dispatch(join({ id: getClientId(), name }))} />
    );

  return <ConnectedMe me={me} />;
}

function ConnectedMe({ me }) {
  const { id, name, intensity } = me;
  const dispatch = useDispatch();
  const device = useRef(null);

  const newDevice = useCallback(
    (d) => {
      device.current = d;
      dispatch(clientDeviceState({ id, hasDevice: true }));
    },
    [id, dispatch]
  );
  useVibration(device.current, intensity);

  return (
    <Chip>
      <Section padded>
        <Text.Large>{name}</Text.Large>
      </Section>
      <ConnectAToy
        onNewDevice={newDevice}
        clickToStart={({ initiateConnection }) => (
          <Section>
            <SectionButton onClick={initiateConnection}>
              Connect My Toy
            </SectionButton>
          </Section>
        )}
        clickToStop={({ stopConnecting }) => (
          <Section>
            <SectionButton onClick={stopConnecting}>
              Stop Connecting
            </SectionButton>
          </Section>
        )}
        connected={() => (
          <Section attention padded>
            <Text.Medium>Connected!</Text.Medium>
          </Section>
        )}
      />
    </Chip>
  );
}

function NewMe({ onJoin }) {
  const [name, setName] = useState("");

  const joinVibe = (e) => {
    onJoin(name);
    e.preventDefault();
  };

  return (
    <Chip>
      <Section padded>
        <form onSubmit={joinVibe}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <button type="submit">Join</button>
        </form>
      </Section>
    </Chip>
  );
}
