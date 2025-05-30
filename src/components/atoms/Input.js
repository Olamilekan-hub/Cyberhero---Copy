import React from "react";
import styled from "styled-components";
import { BiError } from "react-icons/bi";

const Input = ({
  title,
  type,
  name,
  value,
  isRequired,
  handleOnChange,
  errorText,
}) => {
  return (
    <InputContainer>
      <Header>{title}</Header>
      <InputField
        type={type}
        name={name}
        value={value}
        autoComplete="on"
        required={isRequired}
        onChange={(e) => handleOnChange(e.target.name, e.target.value)}
      />
      <ErrorContainer>
        {errorText && (
          <>
            <BiError color={"#ff0033"} size={"24px"} />
            <ErrorText>{errorText}</ErrorText>
          </>
        )}
      </ErrorContainer>
    </InputContainer>
  );
};

Input.defaultProps = {
  title: "Default title",
  name: "Name prop not passed",
  value: "1",
  isRequired: true,
  type: "text",
  handleOnChange: (e) => console.log(e.target.value, e.target.name),
  errorText: null,
};

export default Input;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Header = styled.p`
  margin: 0;
  padding: 10px 0;
  font-weight: 600;
  font-size: 26px;
`;

const InputField = styled.input`
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  font-size: 16px;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  @media (min-width: 768px) {
    height: 30px;
  }
`;

const ErrorText = styled.p`
  margin-left: 10px;
  /* color: #ff0033; */
  /* color: #cc0000; */
`;
