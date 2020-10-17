import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import throttle from "lodash.throttle";
import * as d3 from "d3-scale";

import { ConnectAToy, useVibration } from "react-buttplug";
import { distanceToNode, maxDistanceFromCenterOfNode } from "./distance";
import { urlFor } from "./platforms";
import Button from "./Button";
import texture1 from "./assets/texture1.jpg";

const DEBUG = process.env.NODE_ENV !== "production";

const defaultBackground = css`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${texture1});
`;

const specialBackgrounds = {
  SensateArts: css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://static.wixstatic.com/media/5f397a_0fd6ca9520fa4e148efa5c7b1eacfbea~mv2.jpg/v1/fill/w_980,h_920,al_c,q_85,usm_0.66_1.00_0.01/5f397a_0fd6ca9520fa4e148efa5c7b1eacfbea~mv2.webp);
  `,
  GoddessFaustine: css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://static.wixstatic.com/media/7e492c_84ff1a4dd002470ebd044d451d9ce4d4~mv2.jpg/v1/fill/w_1400,h_935,al_c,q_90/7e492c_84ff1a4dd002470ebd044d451d9ce4d4~mv2.webp);
  `,
};

const FullSizedMain = styled.main`
  ${(props) => specialBackgrounds[props.user] || defaultBackground};
  background-size: cover;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrJustPay = styled.div`
  text-align: center;

  & a {
    color: rgba(255, 255, 255, 0.5);
  }
`;

function Tribute({ platform, user, withToy }) {
  const [device, setDevice] = useState(null);
  const tributeRef = useRef(null);
  const [intensity, setIntensity] = useState(0);

  function updateFromMouse({ clientX, clientY }) {
    if (!tributeRef.current) return;

    const distance = distanceToNode(tributeRef.current, clientX, clientY);
    const maxDistance = maxDistanceFromCenterOfNode(tributeRef.current);
    const scale = d3
      .scalePow()
      .exponent(0.8)
      .clamp(true)
      .domain([maxDistance, 0])
      .range([0, 1]);
    setIntensity(scale(distance));
    DEBUG && console.log(distance, scale(distance));
  }
  const onMouseMove = useCallback(throttle(updateFromMouse, 600));

  useVibration(device, intensity);

  return (
    <FullSizedMain
      user={user}
      onMouseMove={({ clientX, clientY }) => onMouseMove({ clientX, clientY })}
    >
      {withToy && (
        <ConnectAToy
          clickToStart={({ initiateConnection }) => (
            <div>
              <Button glow intensity={0.5} onClick={initiateConnection}>
                Connect a Toy
              </Button>
              <OrJustPay>
                <Link to={`/${platform}/${user}/pay`}>or just pay</Link>
              </OrJustPay>
            </div>
          )}
          clickToStop={({ stopConnecting }) => (
            <Button onClick={stopConnecting}>Stop Connecting</Button>
          )}
          connected={() => null}
          onNewDevice={(d) => setDevice(d)}
        />
      )}
      {(device || !withToy) && (
        <Button
          as="a"
          href={urlFor(platform, user)}
          ref={tributeRef}
          glow
          intensity={intensity}
        >
          Pay Me
        </Button>
      )}
    </FullSizedMain>
  );
}

export default Tribute;
