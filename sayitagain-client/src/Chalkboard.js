import styled from "styled-components";
import chalk from "./chalk.png";

export const Chalkboard = styled.main`
  display: flex;
  flex-direction: row;
`;

export const WritingArea = styled.section`
  height: 100vh;
  overflow: scroll;
  flex-grow: 3;
  padding: 3rem;
`;

export const NotesArea = styled.section`
  width: 20%;
  min-width: 300px;
  border-left: 2px dotted #fff;
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
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const ChalkWriting = styled.span`
  position: relative;
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
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
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

export const Text = styled.span`
  font-size: ${(props) => {
    if (props.huge) return "4rem";
    if (props.large) return "2rem";
    if (props.normal) return "1rem";
    if (props.small) return "0.5rem";
  }};
  text-decoration: ${(props) => {
    if (props.lineThrough) return "line-through";
    return "none";
  }};
  color: ${(props) => {
    if (props.muted) return "rgba(255,255,255, 0.3);";
    return "#FFF";
  }};
`;
