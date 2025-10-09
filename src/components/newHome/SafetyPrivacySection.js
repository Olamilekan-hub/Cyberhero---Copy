import React from 'react';
import styled from 'styled-components';

const SafetyPrivacySection = () => {
  return (
    <Wrapper>
      <Title>Safety & Privacy</Title>
      <Description>
        <i>We do not collect personal information from children. Updates and communications are for adults (18+) only. We maintain a child-first approach to safety, data minimization, and transparency.</i>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;
  background: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 100px;
  padding-bottom: 10px;
  
  @media (max-width: 486px) {
    padding: 15px 10px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: white;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.7;
  margin: 0;
`;

export default SafetyPrivacySection;
