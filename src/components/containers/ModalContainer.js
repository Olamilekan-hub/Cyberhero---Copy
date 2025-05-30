import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import SingleRoundedBorder from "./SingleRoundedBorder";

const ModalContainer = ({ children, onCancel, onSubmit }) => {
  return (
    <MainContainer>
      <Modal>
        <SingleRoundedBorder>
          <Column>
            <Content>{children}</Content>
            <ButtonRow>
              <Button text="Cancel" handleOnClick={onCancel} />
              <Button text="Save" handleOnClick={onSubmit} />
            </ButtonRow>
          </Column>
        </SingleRoundedBorder>
      </Modal>
    </MainContainer>
  );
};
ModalContainer.defaultProps = {
  onCancel: () => console.log("Cancel pressed"),
  onSubmit: () => console.log("Save pressed"),
};
export default ModalContainer;

const MainContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--trans-black);
`;

const Modal = styled.div`
  min-height: 50%;
  width: 90%;
  /* max-width: 700px; */
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled(Column)`
  max-height: 70vh;
  overflow-y: auto;
`;
const ButtonRow = styled.div`
  margin-top: 20px;
  display: flex;
`;
