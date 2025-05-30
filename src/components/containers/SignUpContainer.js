import React from "react";
import styled from "styled-components";
import missionControl from "../../assets/signup.png";
import Button from "../atoms/Button";

export default function SignUpContainer() {
  return (
    <ContainerSignUp>
      <SignUpContentContainer>
        <Header>Sign Up And Start Training</Header>
        <ParagraphContainer>
          <Paragraph>ACTIVITY +</Paragraph>
          <Paragraph>TECHNOLOGY +</Paragraph>
          <Paragraph>ACTIVISM =</Paragraph>
          <Paragraph>REAL WORLD IMPACT</Paragraph>
        </ParagraphContainer>
        <ButtonContainer>
          <Button
            text="Sign Up"
            type="button"
            handleOnClick={() => console.log("SignUp button in SignUpContent")}
          />
        </ButtonContainer>
      </SignUpContentContainer>
    </ContainerSignUp>
  );
}

const ContainerSignUp = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${missionControl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 600px;

  @media (min-width: 768px) {
    background-size: 100% 100%;
  }
`;

const SignUpContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  p {
    margin: 5px;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    p {
      margin: 2px;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

const Header = styled.p`
  font-size: 40px;
  font-weight: 550;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: rgb(0, 199, 199);
`;
