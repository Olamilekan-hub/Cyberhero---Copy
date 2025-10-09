import React from 'react';
import styled from 'styled-components';

const PartnersMediaSection = () => {
  return (
    <Wrapper>
      <Title>Partners & Media</Title>
      <Description>
        We welcome collaborations with schools, libraries, museums, nonprofits, and forward-thinking brands. If you're exploring nature-based learning, youth wellbeing, environmental storytelling and the intersection of AI—and want to help bring <strong>Mission: G.A.I.A.</strong> to life—let's talk.
      </Description>
      <Button>Contact the team</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  margin: 32px auto;
  padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1rem;
  color: white;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.7;
  margin: 0;
`;

const Button = styled.button`
  background: #ffa726;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s;
  
  &:hover {
    background: #ff9800;
  }
`;

export default PartnersMediaSection;
