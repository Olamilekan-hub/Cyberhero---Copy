import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section ref={sectionRef}>
        <OverlayImg>
            <img src="/Strip-Patterns.png" alt="Strip-Patterns" />
        </OverlayImg>
      <ParticleBackground>
        <Particle style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <Particle style={{ top: '60%', left: '80%', animationDelay: '2s' }} />
        <Particle style={{ top: '30%', left: '70%', animationDelay: '4s' }} />
        <Particle style={{ top: '80%', left: '20%', animationDelay: '1s' }} />
      </ParticleBackground>
      <ParticleBackground>
        <Particle1 style={{ top: '10%', right: '45%', animationDelay: '0s' }} />
        <Particle1 style={{ top: '60%', right: '40%', animationDelay: '2s' }} />
        <Particle1 style={{ top: '30%', right: '40%', animationDelay: '4s' }} />
        <Particle1 style={{ top: '80%', right: '40%', animationDelay: '1s' }} />
      </ParticleBackground>
      
      <Content $isVisible={isVisible}>
        <Tagline $isVisible={isVisible}>
          <TaglineIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </TaglineIcon>
          Introducing the Future
        </Tagline>
        
        <Title $isVisible={isVisible}>
          <TitleStrong>Mission: G.A.I.A.</TitleStrong> <br /> Edtech Platform
        </Title>
        
        <Description $isVisible={isVisible}>
          <strong>Mission: G.A.I.A.</strong> is our larger learning world in development an innovative, story-driven platform that nurtures foresight and ecoliteracy helping kids (ages 9–12) develop the skills they need for the future. 
        </Description>
        
        <Description $isVisible={isVisible} $delay="0.8s">
          <strong>B.E.L.A.</strong> is the first taste, the full platform follows as partners come online. Proud partner of UNESCO's Greening Education Partnership.
        </Description>
        
        <ButtonGroup $isVisible={isVisible}>
            <A href="#belaTask">
          <Button>
            Get Started
            <ButtonArrow>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonArrow>
          </Button>
          </A>
          <A href='#about'>
          <SecondaryButton>
            Learn More
          </SecondaryButton></A>
        </ButtonGroup>
      </Content>
      
      <ImageContainer $isVisible={isVisible}>
        <ImageGlow />
        <ImageWrapper>
          <Image src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
          <ImageOverlay />
        </ImageWrapper>
        <FloatingElement style={{ top: '10%', right: '10%', animationDelay: '0s' }}>
          <MiniCard>
            <CardIcon>📚</CardIcon>
            <CardText>Story-Driven Learning</CardText>
          </MiniCard>
        </FloatingElement>
        <FloatingElement style={{ top: '45%', left: '5%', animationDelay: '1.5s' }}>
          <MiniCard>
            <CardIcon>🎮</CardIcon>
            <CardText>Game Based Learning</CardText>
          </MiniCard>
        </FloatingElement>
        <FloatingElement style={{ bottom: '15%', right: '5%', animationDelay: '2s' }}>
          <MiniCard>
            <CardIcon>🌱</CardIcon>
            <CardText>Ecoliteracy Focus</CardText>
          </MiniCard>
        </FloatingElement>
      </ImageContainer>
    </Section>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const floatAlt = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
`;

const glow = keyframes`
  0%, 100% {
    opacity: 0.4;
    filter: blur(40px);
  }
  50% {
    opacity: 0.7;
    filter: blur(60px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const Section = styled.section`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  padding: 60px 12rem;
  position: relative;
  overflow: visible;
  background:rgb(0, 0, 210);
  
  @media (max-width: 1200px) {
    width: 95%;
    gap: 60px;
    padding: 50px 0;
    min-height: 80vh;
  }
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 60px;
    padding: 50px 20px;
    min-height: auto;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 30px 16px;
    gap: 40px;
    margin-bottom: 20px;
  }
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(255, 167, 38, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

const Particle1 = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(255, 167, 38, 0.6) 0%, transparent 70%);
  border-radius: 70%;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 700px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 16px;
  }
  @media (max-width: 486px) {
    gap: 12px;
  }
`;

const TaglineIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  color: #ffa726;
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const Tagline = styled.p`
  font-size: 0.8rem;
  color: #ffa726;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out 0.2s forwards;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  @media (max-width: 486px) {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
`;

const TitleStrong = styled.strong`
  background: linear-gradient(135deg, #ffa726 0%, #ff6f00 50%, #ffa726 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
`;

const Title = styled.h1`
  font-size: 3.7rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  color: #ffffff;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out 0.3s forwards;
  text-shadow: 0 4px 20px rgba(255, 167, 38, 0.3);

  @media(max-width: 1024px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 486px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.8;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  text-align: left;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out ${props => props.$delay || '0.5s'} forwards;
  
  strong {
    color: #ffa726;
    font-weight: 600;
  }
  
  @media (max-width: 1024px) {
    font-size: 1.05rem;
  }
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  @media (max-width: 486px) {
    font-size: 0.85rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out 0.9s forwards;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ButtonArrow = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  transition: transform 0.3s ease;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ffa726 0%, #ff6f00 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 18px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(255, 167, 38, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(255, 167, 38, 0.5);
    
    &::before {
      left: 100%;
    }
    
    ${ButtonArrow} {
      transform: translateX(4px);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
  @media (max-width: 486px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #ffa726;
  border: 2px solid #ffa726;
  border-radius: 12px;
  padding: 16px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 167, 38, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(255, 167, 38, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
  @media (max-width: 486px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;

const BadgeContainer = styled.div`
  margin-top: 20px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out 1s forwards;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 10px;
  }
`;

const BadgeIcon = styled.span`
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const BadgeText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const BadgeSubtitle = styled.span`
  font-size: 0.75rem;
  color: #cbd5e1;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 900px;
  position: relative;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInRight : 'none'} 1s ease-out 0.4s forwards;
  
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const ImageGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background: radial-gradient(circle, rgba(255, 167, 38, 0.4) 0%, transparent 70%);
  animation: ${glow} 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  z-index: 1;
  
  @media (max-width: 1200px) {
    width: 75%;
  }
  @media (max-width: 968px) {
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 486px) {
    width: 90%;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, rgba(255, 111, 0, 0.1) 100%);
  border-radius: 24px;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: 0;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  object-fit: cover;
  max-height: 750px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.5s ease;
  
  ${ImageWrapper}:hover & {
    transform: scale(1.02);
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  animation: ${floatAlt} 5s ease-in-out infinite;
  z-index: 2;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MiniCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  border: 1px solid rgba(255, 167, 38, 0.3);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
  }
`;

const CardIcon = styled.span`
  font-size: 1.5rem;
`;

const CardText = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
  color: black;
  white-space: nowrap;
`;

const A = styled.a`
  text-decoration: none;
  color: inherit;
`;

const OverlayImg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
  height: 100%
//   transform: scaleX(-1); 
  object-fit: cover;
  z-index: -1; 
  }
`;

export default HeroSection;