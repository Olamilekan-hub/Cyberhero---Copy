import React from "react";
import styled from "styled-components";

const DoubleRoundedBorder = ({ children, width }) => {
  return (
    <MainContainer width={width}>
      <InnerContainer>{children}</InnerContainer>
    </MainContainer>
  );
};

export default DoubleRoundedBorder;

const Container = styled.div`
  border: 2px solid var(--trans-cyan);
  border-radius: 25px;
  padding: 2%;
`;
const MainContainer = styled(Container)`
  ${({ width }) => width && `width: ${width}`};
  background-color: var(--trans-blue);
`;
const InnerContainer = styled(Container)`
  padding: 5%;

  @media (min-width: 768px) {
    padding: 2%;
  }
`;
