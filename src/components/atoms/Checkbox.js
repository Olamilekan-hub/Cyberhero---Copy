// React
import React from "react";

// Styled Components
import styled from "styled-components";

// Assets
import { BiError } from "react-icons/bi";

const Checkbox = ({ title, name, value, handleOnChange, errorText }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        type="checkbox"
        name={name}
        checked={value}
        onChange={(e) => handleOnChange(e.target.name, e.target.checked)}
      />
      <CheckboxLabel>{title}</CheckboxLabel>
      <ErrorContainer>
        {errorText && (
          <>
            <BiError color={"#ff0033"} size={"24px"} />
            <ErrorText>{errorText}</ErrorText>
          </>
        )}
      </ErrorContainer>
    </CheckboxContainer>
  );
};
Checkbox.defaultProps = {
  title: "Default title",
  name: "Name prop not passed",
  value: false,
  handleOnChange: (e) => console.log(e.target.value, e.target.name),
  errorText: null,
};

export default Checkbox;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const CheckboxInput = styled.input`
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 18px;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ErrorText = styled.p`
  color: #ff0033;
  font-size: 14px;
  margin-left: 5px;
`;
