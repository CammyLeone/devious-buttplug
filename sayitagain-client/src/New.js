import React, { useState } from "react";
import qs from "qs";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Text } from "./style/Chalkboard";

const URL_BASE = process.env.REACT_APP_LINK_BASE;

const Label = styled.label`
  display: block;
`;

const ChalkLink = styled.a`
  color: #e9658f;
`;

const Container = styled.main`
  padding: 2rem;
`;

export default function New() {
  const { register, handleSubmit } = useForm();
  const [url, setUrl] = useState(null);

  const generateLink = ({ text, count, cashtag }) => {
    const encoded = btoa(
      qs.stringify({
        text,
        count,
      })
    );

    setUrl(`${URL_BASE}/${encoded}`);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(generateLink)}>
        <div>
          <Label htmlFor="text">Line they should write</Label>
          <textarea
            name="text"
            id="text"
            ref={register}
            rows="5"
            cols="80"
            defaultValue="I deserve this."
          />
        </div>
        <div>
          <Label htmlFor="count">Number of times they should write it</Label>
          <input
            name="count"
            id="count"
            type="number"
            ref={register}
            defaultValue={10}
          />
        </div>
        {/* <div> */}
        {/*   <Label htmlFor="cashtag">Cashtag</Label> */}
        {/*   <input name="cashtag" id="cashtag" type="text" ref={register} /> */}
        {/* </div> */}
        <div>
          <input type="submit" value="Generate a URL" />
        </div>
      </form>
      {url && (
        <section>
          <Text large>
            <ChalkLink href={url}>{url}</ChalkLink>
          </Text>
          <br />
          <Text normal muted>
            <span role="img" aria-label="Link above">
              ☝️
            </span>{" "}
            send this link to your submissive
          </Text>
        </section>
      )}
    </Container>
  );
}
