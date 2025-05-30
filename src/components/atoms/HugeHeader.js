import React from "react";
import styled from "styled-components";

const HugeHeader = ({ children }) => {
  return <Text>{children}</Text>;
};

export default HugeHeader;

const Text = styled.h2`
  font-size: 20px;
  margin: 10px;
  font-family: "Bionic", sans-serif;
  line-height: 60px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
  @media (min-width: 1000px) {
    font-size: 40px;
  }
`;
