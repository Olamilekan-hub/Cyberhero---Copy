import React from "react";
import styled from "styled-components";
import SoundButton from "./SoundButton";

const TrainingAreaCard = ({ title, btnText, width, callback, setBG, inside = true, status }) => {
  console.log(status)
  return (
    <MainContainer width={width}>
      <h2>{title}</h2>
      <SoundButton>
        <button
          onClick={() => {
            callback();
            setBG(2);
          }}
          style={{backgroundColor : (inside && !status ? "#00BDFF" : "gray")}}
          disabled={!inside}
        >
          {inside ? btnText : "Coming soon"}
        </button>
      </SoundButton>
    </MainContainer>
  );
};

export default TrainingAreaCard;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px 0;
  width: calc((100% - 20px) / 3);
  gap: 12px;
  background-color: white;
  h2 {
    color: var(--cyan);
    font-size: 12pt;
  }
  button {
    margin-top: 20px;
    padding: 6px 4px;
    width: 80px;
    background: var(--light-cyan);
    color: white;
    font-size: 16pt;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
  }
  @media (min-width: 426px) {
    padding: 24px 0;
    h2 {
      font-size: 18pt;
    }
    button{
      width: 120px;
      padding: 8px 4px;
      font-size: 20pt;
    }
  }
  @media (min-width: 769px) {
    padding: 32px 0;
    button {
      width: 180px;
      padding: 12px 6px;
      font-size: 25pt;
    }
  }
`;
