import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiError, BiCheck } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  title,
  name,
  value,
  isRequired,
  handleOnChange,
  errorText,
  showStrength = true,
  userInfo = {}
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({
    score: 0,
    feedback: [],
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      digits: false,
      symbols: false,
      notCommon: false
    }
  });

  useEffect(() => {
    if (value && showStrength) {
      checkPasswordStrength();
    }
  }, [value]);

  const checkPasswordStrength = async () => {
    try {
      const response = await fetch('/.netlify/functions/checkPasswordStrength', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: value,
          userInfo: userInfo
        })
      });

      if (response.ok) {
        const result = await response.json();
        setStrength(result);
      }
    } catch (error) {
      console.error('Password strength check failed:', error);
    }
  };

  const getStrengthColor = (score) => {
    const colors = {
      0: '#ff4757', // Very weak - red
      1: '#ff6348', // Weak - orange-red
      2: '#ffa502', // Fair - orange
      3: '#2ed573', // Good - green
      4: '#1e90ff'  // Strong - blue
    };
    return colors[score] || colors[0];
  };

  const getStrengthText = (score) => {
    const texts = {
      0: 'Very Weak',
      1: 'Weak',
      2: 'Fair',
      3: 'Good',
      4: 'Strong'
    };
    return texts[score] || 'Very Weak';
  };

  return (
    <InputContainer>
      <Header>{title}</Header>
      <PasswordFieldContainer>
        <PasswordField
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          autoComplete="new-password"
          required={isRequired}
          onChange={(e) => handleOnChange(e.target.name, e.target.value)}
        />
        <ToggleButton
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </ToggleButton>
      </PasswordFieldContainer>

      {showStrength && value && (
        <StrengthContainer>
          <StrengthBar>
            <StrengthFill 
              width={`${(strength.score + 1) * 20}%`}
              color={getStrengthColor(strength.score)}
            />
          </StrengthBar>
          <StrengthText color={getStrengthColor(strength.score)}>
            {getStrengthText(strength.score)}
          </StrengthText>
        </StrengthContainer>
      )}

      {showStrength && value && (
        <RequirementsContainer>
          <RequirementItem met={strength.requirements.length}>
            {strength.requirements.length ? <BiCheck /> : <BiError />}
            8+ characters
          </RequirementItem>
          <RequirementItem met={strength.requirements.uppercase}>
            {strength.requirements.uppercase ? <BiCheck /> : <BiError />}
            Uppercase letter
          </RequirementItem>
          <RequirementItem met={strength.requirements.lowercase}>
            {strength.requirements.lowercase ? <BiCheck /> : <BiError />}
            Lowercase letter
          </RequirementItem>
          <RequirementItem met={strength.requirements.digits}>
            {strength.requirements.digits ? <BiCheck /> : <BiError />}
            Number
          </RequirementItem>
          <RequirementItem met={strength.requirements.symbols}>
            {strength.requirements.symbols ? <BiCheck /> : <BiError />}
            Special character
          </RequirementItem>
          <RequirementItem met={strength.requirements.notCommon}>
            {strength.requirements.notCommon ? <BiCheck /> : <BiError />}
            Not common password
          </RequirementItem>
        </RequirementsContainer>
      )}

      <ErrorContainer>
        {errorText && (
          <>
            <BiError color={"#ff0033"} size={"24px"} />
            <ErrorText>{errorText}</ErrorText>
          </>
        )}
      </ErrorContainer>

      {strength.feedback.length > 0 && (
        <FeedbackContainer>
          {strength.feedback.map((feedback, index) => (
            <FeedbackItem key={index}>{feedback}</FeedbackItem>
          ))}
        </FeedbackContainer>
      )}
    </InputContainer>
  );
};

export default PasswordInput;

// Styled Components
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
`;

const Header = styled.p`
  margin: 0;
  padding: 10px 0;
  font-weight: 600;
  font-size: 26px;
`;

const PasswordFieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordField = styled.input`
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px 40px 10px 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  
  &:hover {
    color: #333;
  }
`;

const StrengthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 10px;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
`;

const StrengthFill = styled.div`
  width: ${props => props.width};
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.3s ease, background-color 0.3s ease;
`;

const StrengthText = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.color};
  min-width: 80px;
  text-align: right;
`;

const RequirementsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.met ? '#2ed573' : '#ff4757'};
  
  svg {
    font-size: 14px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 10px;
  
  @media (min-width: 768px) {
    height: 30px;
  }
`;

const ErrorText = styled.p`
  margin-left: 10px;
  color: #ff0033;
`;

const FeedbackContainer = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const FeedbackItem = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
`;