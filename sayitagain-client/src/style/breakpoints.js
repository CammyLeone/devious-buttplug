import { css } from "styled-components";

export const breakpointValues = {
  mobile: 0,
  tablet: 928,
  desktop: 1200,
};

const breakpoints = {
  mobile: `min-width: ${breakpointValues.mobile}`,
  mobileMax: `max-width: ${breakpointValues.tablet - 1}px`,
  tablet: `min-width: ${breakpointValues.tablet}px`,
  tabletMax: `max-width: ${breakpointValues.desktop - 1}px`,
  desktop: `min-width: ${breakpointValues.desktop}px`,
};

const media = {
  mobileOnly: (...args) => css`
    @media only screen and (${breakpoints.mobile}) and (${breakpoints.mobileMax}) {
      ${css(...args)};
    }
  `,
  tabletOnly: (...args) => css`
    @media only screen and (${breakpoints.tablet}) and (${breakpoints.tabletMax}) {
      ${css(...args)};
    }
  `,
  tabletUp: (...args) => css`
    @media only screen and (${breakpoints.tablet}) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media only screen and (${breakpoints.desktop}) {
      ${css(...args)};
    }
  `,
};

export default media;
