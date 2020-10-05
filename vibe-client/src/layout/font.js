import styled, { css } from "styled-components";

export const font = {
  large: css`
    font-size: 1.5rem;
  `,
  medium: css`
    font-size: 1rem;
  `,
  small: css`
    font-size: 0.5rem;
  `,
};

export const Text = {
  Large: styled.span`
    ${font.large}
  `,
  Medium: styled.span`
    ${font.medium}
  `,
  Small: styled.span`
    ${font.small}
  `,
};
