import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Container } from "../../layout";
import Others from "./Others";
import Me from "./Me";
import { newSession, initFromServer } from "./shareSlice";

export function Share() {
  const { group } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newSession(group));
    dispatch(initFromServer());
  });

  return (
    <Container>
      <Me />
      <Others />
    </Container>
  );
}
