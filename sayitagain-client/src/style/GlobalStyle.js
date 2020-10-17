import { createGlobalStyle } from "styled-components";
import media from "./breakpoints";

export default createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    background: url(https://raw.github.com/mmoustafa/Chalkboard/master/img/bg.png) repeat center center fixed;
    font-size: 12px;
    ${media.tabletUp`font-size: 16px`}
  }

  body {
    margin: 0;
    font: 16pt 'Gloria Hallelujah';
    color: #FFF;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
