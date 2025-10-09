import React from 'react';
import styled from 'styled-components';

const AwardsSection = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Awards & Partners</Title>
        <PartnersRow>
          <PartnerItem>
            <LogoContainer>
              <Logo src="/nycbba24_winner+JPG+Seal-1.webp" alt="NYC Big Book Award" />
            </LogoContainer>
            <Caption>NYC Big Book Award — Middle Grade (Future Hack)</Caption>
          </PartnerItem>
          <PartnerItem>
            <LogoContainer>
              <Logo src="/images.png" alt="Neighborhood Forest" />
            </LogoContainer>
            <Caption>Neighborhood Forest – Partner</Caption>
          </PartnerItem>
          <PartnerItem>
            <LogoContainer>
              <Logo src="/unesco-logo-png_seeklogo-349497.png" alt="UNESCO" />
            </LogoContainer>
            <Caption>UNESCO Greening Education Partnership — Partner</Caption>
          </PartnerItem>
        </PartnersRow>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;
  min-height: 350px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  
  @media (max-width: 968px) {
    padding: 60px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  
  @media (max-width: 968px) {
    gap: 48px;
  }
  
  @media (max-width: 768px) {
    gap: 36px;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 0;
  text-align: center;
  color: #1a1a1a;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    letter-spacing: -0.01em;
  }
`;

const PartnersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 48px;
  align-items: start;

  
  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const PartnerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 20px 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 11, 168, 0.77);
  transition: all 0.3s ease;
  height: 300px;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 35px rgba(0, 11, 168, 0.42);
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    gap: 16px;
    height: 270px;
  }
  
  @media (max-width: 486px) {
    padding: 18px 14px;
    gap: 12px;
    height: 250px;
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 11, 168, 0.77);
  
  @media (max-width: 968px) {
    width: 100px;
    height: 100px;
    padding: 12px;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    padding: 10px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Caption = styled.span`
  font-size: 1,2rem;
  color: #2a2a2a;
  text-align: center;
  line-height: 1.5;
  font-weight: 700;
  max-width: 280px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default AwardsSection;