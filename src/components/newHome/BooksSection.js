import React from 'react';
import styled, { keyframes } from 'styled-components';

const BooksSection = () => {
  return (
    <Wrapper>
      <Content>
        <HeaderSection>
          <Title>Books From the Chronicles of G.A.I.A.</Title>
          <Subtitle>
            Where B.E.L.A. was born. The award-winning middle-grade series that turns eco-anxiety into curiosity, courage, and care.
          </Subtitle>
        </HeaderSection>
        <Grid>
          <BookCard>
            <ImageContainer>
              <Image src="/Future+Hack_Cover.webp" alt="Future Hack" />
              <ImageOverlay>
                <OverlayText>View Details</OverlayText>
              </ImageOverlay>
            </ImageContainer>
            <BookContent>
              <BookTitle>Future Hack</BookTitle>
              <Description>
                A mysterious AI and a team of kids race to protect what matters.
              </Description>
            </BookContent>
          </BookCard>
          <BookCard>
            <ImageContainer>
              <Image src="/2Norbu's+Secret_FH.webp" alt="Norbu's Secret" />
              <ImageOverlay>
                <OverlayText>View Details</OverlayText>
              </ImageOverlay>
            </ImageContainer>
            <BookContent>
              <BookTitle>Norbu's Secret</BookTitle>
              <Description>
                A time-bending mission tests friendship, grit, and hope.
              </Description>
            </BookContent>
          </BookCard>
        </Grid>
      </Content>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Wrapper = styled.section`
  width: 100vw;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
//   position: relative;
  overflow: hidden;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
  
  @media (max-width: 968px) {
    padding: 80px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: ;
  
  @media (max-width: 968px) {
    gap: 48px;
  }
  
  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 4.5rem;
  font-weight: 900;
  margin: 0;
  color:#000000;
  letter-spacing: -0.02em;
  line-height: 1;
  font-family: "monospace", "Consolas", "Courier New";
  
  @media (max-width: 768px) {
    letter-spacing: -0.01em;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  color: #000;
  line-height: 1.6;
  padding: 2px 5rem;
  font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 48px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
  }
  
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const BookCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  // width: 600px;
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    
    &:hover {
      transform: translateY(-8px) scale(1.01);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  min-height: 400px;
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover div {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    min-height: 320px;
  }
  
  @media (max-width: 580px) {
    padding: 20px;
    min-height: 280px;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    max-width: 220px;
    border-radius: 12px;
  }
  
  @media (max-width: 580px) {
    max-width: 200px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
`;

const OverlayText = styled.span`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BookContent = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    gap: 10px;
  }
  
  @media (max-width: 580px) {
    padding: 20px 16px;
  }
`;

const BookTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.125rem);
  color: #5a5a5a;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;
`;

export default BooksSection;