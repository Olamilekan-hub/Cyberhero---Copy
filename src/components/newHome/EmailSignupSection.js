import React, { useState } from 'react';
import styled from 'styled-components';

const EmailSignupSection = () => {
  const [email, setEmail] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [contactMe, setContactMe] = useState(false);

  return (
    <Wrapper>
      <MainTitle>Stay in the loop</MainTitle>
      <Content>
        <TextContent>
          <Title>Parents & Educators (18+) only.</Title>
          <Description>
            Get B.E.L.A. launch news and free classroom resources that turn story into simple real-world actions.<br />
            • Short updates about B.E.L.A. milestones <br />
            • Printable activities & discussion guides <br />
            • Opportunities to pilot projects
          </Description>
        </TextContent>
        <FormContainer>
          <Form>
            <InputRow>
              <EmailInput
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <SubmitButton type="submit" disabled={!isAdult}>
                Continue
              </SubmitButton>
            </InputRow>
            <CheckboxLabel>
              <Checkbox
                checked={isAdult}
                onChange={e => setIsAdult(e.target.checked)}
                required
              />
              I confirm I am 18 or older.
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                checked={contactMe}
                onChange={e => setContactMe(e.target.checked)}
              />
              Contact me about partnerships/media.
            </CheckboxLabel>
          </Form>
        </FormContainer>
      </Content>
      <Microcopy>
        <i>We never collect personal information from children. Unsubscribe anytime.</i>
      </Microcopy>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 80%;
  padding: 30px 30px;
  margin: 100px 0;
  background: black;
  border-radius: 30px;
  
  @media(max-width: 1440px) {
    width: 90%;
  }
  @media (max-width: 1024px) {
    width: 98%;
  }
  @media (max-width: 768px) {
    width: 98%;
  }
`;

const MainTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  
  @media (max-width: 1024px) {
    font-size: 1.7rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
  padding: 50px 0;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }
  @media (max-width: 768px) {
    font-size: .95rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: white;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.7;
  margin: 0;
  
  @media (max-width: 1024px) {
    font-size: .85em;
  }
  @media (max-width: 768px) {
    font-size: .75rem;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  justify-content: flex-end;
  
  @media (max-width: 1024px) {
    gap: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-self: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 100%;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: none;
  font-size: 1rem;
  outline: none;
  background: transparent;
  color: #222;

  &::placeholder {
    color: #888;
    font-weight: 400;
  }
  
  @media (max-width: 1024px) {
    font-size: 0.75rem;
    padding: 10px 12px;
  }
`;

const SubmitButton = styled.button`
  background: #d46a00;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 500;
  height: auto;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: #ffa726;
  }
  
  @media (max-width: 1024px) {
    font-size: 0.75rem;
    padding: 10px 26px;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ffa726;
  border-radius: 6px;
  background: #fff;
  margin-right: 8px;
  transition: border 0.2s, box-shadow 0.2s;
  position: relative;
  cursor: pointer;
  outline: none;

  &:checked {
    background: #ffa726;
    border-color: #d46a00;
  }
  &:checked:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    display: block;
  }
  &:focus {
    box-shadow: 0 0 0 2px #ffa72644;
  }
  
  @media (max-width: 1024px) {
    width: 14px;
    height: 14px;
    border: 1px solid #ffa726;
  }
  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 1rem;
  color: #eaeaea;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  @media (max-width: 1024px) {
    font-size: 0.9rem;
    gap: 6px;
  }
`;

const Microcopy = styled.p`
  font-size: 0.95rem;
  color: #eaeaea;
  margin-top: 8px;
  text-align: center;
  
  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }
`;

export default EmailSignupSection;
