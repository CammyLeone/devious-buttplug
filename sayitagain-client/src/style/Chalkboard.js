import styled from "styled-components";
import media from "./breakpoints";
import chalk from "../assets/chalk.png";

export const Text = styled.span`
  font-size: ${(props) => {
    if (props.huge) return "4rem";
    if (props.large) return "2rem";
    if (props.normal) return "1.5rem";
    if (props.small) return "0.5rem";
  }};
  text-decoration: ${(props) => {
    if (props.lineThrough) return "line-through";
    return "none";
  }};
  color: ${(props) => {
    if (props.muted) return "rgba(255,255,255, 0.3);";
    if (props.error) return "#FFBEA4";
    if (props.success) return "#9CCCB8";
    if (props.attention) return "#A189B5";
    return "#FFF";
  }};
`;

export const Chalkboard = styled.main`
  display: flex;
  flex-direction: column-reverse;
  ${media.tabletUp`flex-direction: row;`}
`;

export const WritingArea = styled.section`
  height: 100vh;
  overflow: scroll;
  padding: 3rem;
  flex-grow: 3;
`;

export const InstructionAssignment = styled(Text).attrs(() => ({
  large: true,
  attention: true,
}))`
  word-break: break-word;
  text-align: center;
`;

export const NotesArea = styled.section`
  ${media.tabletUp`
    min-width: 12rem;
    max-width: 18rem;

    border-left: 2px dotted #fff;
  `}

  display: flex;
  flex-direction: column;

  & section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-bottom: 2px dotted #fff;
    ${media.tabletUp`
      &:last-of-type {
        border-bottom: 0;
      }
    `}
  }
`;

export const ChalkWriting = styled.span`
  cursor: text;
  position: relative;
  word-break: break-all;
  font-size: 4rem;

  &::after {
    content: "";
    display: inline-block;
    vertical-align: bottom;
    height: 3rem;
    width: 3rem;
    background: url(${chalk});
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const ChalkButton = styled.button`
  font-family: "Gloria Hallelujah";
  font-size: 2rem;
  text-decoration: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  ${(props) =>
    props.disabled &&
    `
    background-color: rgb(255,190,164, 0.4);
  `}
  border: 1px solid #fff;
  padding: 1rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
