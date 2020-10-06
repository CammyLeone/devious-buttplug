import styled from "styled-components";
import chalk from "./chalk.png";

export const Chalkboard = styled.main`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: url(https://raw.github.com/mmoustafa/Chalkboard/master/img/bg.png);
`;

export const WritingArea = styled.section`
  flex-grow: 3;
  padding: 3rem;
`;

export const NotesArea = styled.section`
  width: 20%;
  min-width: 300px;
  border-left: 2px dotted #fff;
  & section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    border-bottom: 2px dotted #fff;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
`;

export const ChalkWriting = styled.span`
  box-sizing: border-box;
  position: relative;
  font-size: 4rem;
  color: #fff;

  ${(props) =>
    props.populated &&
    `
  color: rgba(255,255,255, 0.3);
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
  `}
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
