import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { ALL_PLATFORMS, PLATFORM, identifierFor, labelFor } from "./platforms";
const URL_BASE = process.env.REACT_APP_LINK_BASE;

export default function New() {
  const { register, handleSubmit, watch } = useForm();
  const [url, setUrl] = useState(null);
  const selectedPlatform = watch("platform");
  const selectedPlatformIsVenmo = selectedPlatform === PLATFORM.VENMO;

  const generateLink = ({ platform, user }) => {
    setUrl(`${URL_BASE}/${platform}/${user}`);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(generateLink)}>
        <div>
          <label htmlFor="platform">How you want your money:</label>
          <select name="platform" id="platform" ref={register}>
            {ALL_PLATFORMS.map((p, idx) => (
              <option value={p} key={idx}>
                {labelFor(p)}
              </option>
            ))}
          </select>
        </div>
        {selectedPlatform && (
          <div>
            <div>
              <label htmlFor="user">
                Your {labelFor(selectedPlatform)}{" "}
                {identifierFor(selectedPlatform)}:
              </label>
              <input
                name="user"
                id="user"
                type="text"
                ref={register}
                disabled={selectedPlatformIsVenmo}
              />
            </div>
            {selectedPlatformIsVenmo &&
              "Sorry, Venmo isn't doing web payments any more :("}
            <div>
              <input type="submit" value="Generate a URL" />
            </div>
          </div>
        )}
      </form>
      {url && (
        <section>
          <a href={url}>{url}</a>
          <br />
          <span role="img" aria-label="Link above">
            ☝️
          </span>{" "}
          send this link to your submissive
        </section>
      )}
    </main>
  );
}
