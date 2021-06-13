import styled, { createGlobalStyle } from "styled-components";
import "@fontsource/monoton";
import "@fontsource/paytone-one";
// import { up } from "styled-breakpoints";

export const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    font-size: 20px;
    background-color: #f3c1c0;
    color: #FFF;
  }
`;

export const Drawer = styled.div`
  padding: 1rem;
  box-shadow: 8px 0px 7px 5px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
`;
