import React from "react";
import styled from "styled-components";

export default function RoundedContainer({ title, description }) {
  return (
    <MainContainer>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Go Training</button>
    </MainContainer>
  );
}

RoundedContainer.defaultProps = {
  title: "Title placeholder",
  description:
    "Description placeholder Description placeholder Description placeholder Description placeholder Description placeholder Description placeholder Description placeholder",
};

const MainContainer = styled.div`
  height: 200px;
  width: 500px;
  border: 2px solid cyan;
  background: rgba(0, 255, 255, 0.4);
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  h3 {
    margin: 0;
    color: #2eff58;
    font-weight: 500;
  }

  p {
    /* border: 1px solid white; */
    height: 80px;
    width: 400px;
    margin: 0;
    overflow: auto;
  }
  button {
    width: 125px;
    height: 35px;
    background: #2eff58;
    border: none;
    border-radius: 10px;
    font-size: 20px;
  }
`;
