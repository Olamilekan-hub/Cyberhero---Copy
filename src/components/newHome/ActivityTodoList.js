import React from 'react';
import styled, { keyframes } from 'styled-components';

const ActivityTodoList = ({ activityIdx, todos }) => {
  const [states, setStates] = React.useState(
    todos.map(() => ({ checked: false, answer: "" }))
  );

  const handleCheck = (idx, checked) => {
    const newStates = states.map((s, i) => i === idx ? { ...s, checked } : s);
    setStates(newStates);
  };

  const handleAnswer = (idx, answer) => {
    const newStates = states.map((s, i) => i === idx ? { ...s, answer } : s);
    setStates(newStates);
  };

  return (
    <List>
      {todos.map((todo, idx) => (
        <TodoItem key={todo.key} $delay={idx * 0.1}>
          <CheckRow>
            <CheckboxWrapper>
              <HiddenCheckbox
                type="checkbox"
                checked={states[idx].checked}
                onChange={e => handleCheck(idx, e.target.checked)}
              />
              <StyledCheckbox $checked={states[idx].checked}>
                {states[idx].checked && (
                  <CheckIcon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </CheckIcon>
                )}
              </StyledCheckbox>
            </CheckboxWrapper>
            <Label $checked={states[idx].checked}>
              {todo.label}
            </Label>
          </CheckRow>
          {todo.answer && (
            <AnswerWrapper>
              <AnswerInput
                type="text"
                value={states[idx].answer}
                onChange={e => handleAnswer(idx, e.target.value)}
                placeholder="Type your answer here..."
                disabled={states[idx].checked}
                $checked={states[idx].checked}
              />
              <InputIcon $checked={states[idx].checked}>
                {states[idx].checked ? '✓' : '✎'}
              </InputIcon>
            </AnswerWrapper>
          )}
        </TodoItem>
      ))}
    </List>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const checkmark = keyframes`
  0% {
    stroke-dashoffset: 50;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TodoItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 18px 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out ${props => props.$delay}s forwards;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
    border-color: rgba(255, 167, 38, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    gap: 10px;
  }
  
  @media (max-width: 486px) {
    padding: 12px 14px;
    gap: 8px;
  }
`;

const CheckRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 14px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 2px solid ${props => props.$checked ? '#10b981' : '#ffa726'};
  background: ${props => props.$checked 
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
    : 'rgba(255, 167, 38, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  
  ${HiddenCheckbox}:hover + & {
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(255, 167, 38, 0.2);
  }
  
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 4px rgba(255, 167, 38, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 486px) {
    width: 22px;
    height: 22px;
    border-radius: 6px;
  }
`;

const CheckIcon = styled.svg`
  width: 18px;
  height: 18px;
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 50;
  stroke-dashoffset: 0;
  animation: ${checkmark} 0.3s ease-in-out, ${scaleIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
  }
`;

const Label = styled.span`
  flex: 1;
  font-size: 1.08rem;
  color: ${props => props.$checked ? "#94a3b8" : "#f1f5f9"};
  text-decoration: ${props => props.$checked ? "line-through" : "none"};
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 486px) {
    font-size: 0.85rem;
  }
`;

const AnswerWrapper = styled.div`
  position: relative;
  margin-left: 42px;
  
  @media (max-width: 768px) {
    margin-left: 36px;
  }
  
  @media (max-width: 486px) {
    margin-left: 0;
  }
`;

const AnswerInput = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 2px solid ${props => props.$checked ? '#94a3b8' : '#ffa726'};
  padding: 12px 44px 12px 16px;
  font-size: 1rem;
  background: ${props => props.$checked 
    ? 'rgba(148, 163, 184, 0.1)' 
    : 'rgba(255, 255, 255, 0.08)'};
  color: ${props => props.$checked ? "#94a3b8" : "#f1f5f9"};
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  
  &::placeholder {
    color: ${props => props.$checked ? "#64748b" : "#cbd5e1"};
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$checked ? '#94a3b8' : '#ff6f00'};
    box-shadow: 0 0 0 4px ${props => props.$checked 
      ? 'rgba(148, 163, 184, 0.2)' 
      : 'rgba(255, 167, 38, 0.2)'};
    background: ${props => props.$checked 
      ? 'rgba(148, 163, 184, 0.15)' 
      : 'rgba(255, 255, 255, 0.12)'};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 40px 10px 14px;
  }
  
  @media (max-width: 486px) {
    font-size: 0.85rem;
    padding: 9px 36px 9px 12px;
  }
`;

const InputIcon = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: ${props => props.$checked ? '#10b981' : '#ffa726'};
  pointer-events: none;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    right: 12px;
  }
  
  @media (max-width: 486px) {
    font-size: 1rem;
    right: 10px;
  }
`;

export default ActivityTodoList;