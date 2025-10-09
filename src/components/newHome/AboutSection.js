import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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
    <Wrapper id='about' ref={sectionRef}>
      <Container>
        <Header $isVisible={isVisible}>
          <Title $isVisible={isVisible}>
            About <TitleHighlight>Mission: G.A.I.A.</TitleHighlight>
          </Title>
          <Divider $isVisible={isVisible} />
        </Header>

        <MainContent>
          {/* First Section - Image Left, Text Right */}
          <ContentRow $isVisible={isVisible}>
            <ImageCard $isVisible={isVisible} $delay="0.3s">
              <ImageWrapper>
                <StyledImage src="/Future+Hack_Cover.webp" alt="Mission GAIA Platform" />
                <ImageOverlay />
              </ImageWrapper>
              <ImageLabel>
                <LabelIcon>📖</LabelIcon>
                <LabelText>Chronicles of G.A.I.A.</LabelText>
              </ImageLabel>
            </ImageCard>

            <TextCard $isVisible={isVisible} $delay="0.4s">
              <CardIcon>🌍</CardIcon>
              <CardTitle>Inspiring Tomorrow's Eco-Leaders</CardTitle>
              <CardDescription>
                <strong>Mission: G.A.I.A.</strong> is an innovative edtech platform inspiring and empowering young people to become the eco-leaders of tomorrow. Built on the foundation of the award-winning "Chronicles of G.A.I.A." book series, our platform transforms environmental education into an exciting and rewarding adventure through interest-based learning and gamification.
              </CardDescription>
              <FeatureList>
                <FeatureItem>
                  <FeatureIcon>✨</FeatureIcon>
                  <FeatureText>Award-winning book series foundation</FeatureText>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon>🎮</FeatureIcon>
                  <FeatureText>Gamified learning experience</FeatureText>
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon>🌱</FeatureIcon>
                  <FeatureText>Interest-based environmental education</FeatureText>
                </FeatureItem>
              </FeatureList>
            </TextCard>
          </ContentRow>

          {/* Story Section */}
          <StorySection $isVisible={isVisible} $delay="0.6s">
            <StoryContent>
              <StoryIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </StoryIcon>
              <StoryText>
                The series follows a team of young heroes and a time-traveling teen with his beloved cat, Pasha, as they tackle missions to prevent future climate catastrophes. Through this engaging narrative, we teach today's youth the resilience skills they need to confront climate change and eco-anxiety while fostering a proactive mindset towards creating a sustainable future.
              </StoryText>
            </StoryContent>
          </StorySection>

          {/* Second Section - Text Left, Image Right */}
          {/* <ContentRow $reverse $isVisible={isVisible} $delay="0.8s">
            <TextCard $isVisible={isVisible} $delay="0.9s">
              <CardIcon>🤝</CardIcon>
              <CardTitle>UNESCO Partnership & Community</CardTitle>
              <CardDescription>
                As a proud partner of UNESCO's Greening Education Partnership, <strong>Mission: G.A.I.A.</strong> creates a supportive community that nurtures mental well-being, environmental literacy, and the development of compassionate future leaders.
              </CardDescription>
              <CardDescription>
                Our platform provides a secure environment where children can explore, discover, and expand their understanding of our planet's ecosystems through interactive, project-based learning that resonates with their interests.
              </CardDescription>
              <PartnershipBadge>
                <BadgeIcon>🌐</BadgeIcon>
                <BadgeContent>
                  <BadgeTitle>Official Partner</BadgeTitle>
                  <BadgeSubtitle>UNESCO Greening Education Partnership</BadgeSubtitle>
                </BadgeContent>
              </PartnershipBadge>
            </TextCard>

            <ImageCard $isVisible={isVisible} $delay="1s">
              <ImageWrapper>
                <StyledImage src="/2Norbu's+Secret_FH.webp" alt="Norbu's Secret" />
                <ImageOverlay />
              </ImageWrapper>
              <ImageLabel>
                <LabelIcon>🔮</LabelIcon>
                <LabelText>Norbu's Secret</LabelText>
              </ImageLabel>
            </ImageCard>
          </ContentRow>
          
          <MissionCard $isVisible={isVisible} $delay="1.2s">
            <MissionIcon>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </MissionIcon>
            <MissionTitle>Our Commitment</MissionTitle>
            <MissionText>
              We are committed to empowering the next generation with the knowledge, empathy, and action-oriented skills necessary to protect our planet and build a sustainable tomorrow.
            </MissionText>
          </MissionCard> */}
        </MainContent>
      </Container>
    </Wrapper>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

const expandWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: 120px;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const Wrapper = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, rgba(50, 77, 139, 0.95) 0%, rgba(113, 157, 227, 0.9) 100%);
  width: 100vw;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(255, 167, 38, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 968px) {
    padding: 80px 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 968px) {
    padding: 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #ffa726;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 2px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 24px 0;
  color: #ffffff;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.2s forwards;
  
  @media (max-width: 1024px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 486px) {
    font-size: 1.8rem;
  }
`;

const TitleHighlight = styled.strong`
  background: linear-gradient(135deg, #ffa726 0%, #ff6f00 50%, #ffa726 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
`;

const Divider = styled.div`
  height: 4px;
  background: linear-gradient(90deg, transparent 0%, #ffa726 50%, transparent 100%);
  margin: 0 auto;
  border-radius: 2px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? expandWidth : 'none'} 1s ease-out 0.4s forwards;
  width: 0;
  
  @media (max-width: 768px) {
    height: 3px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  
  @media (max-width: 968px) {
    gap: 60px;
  }
  
  @media (max-width: 768px) {
    gap: 50px;
  }
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$reverse ? '1.2fr 1fr' : '1fr 1.2fr'};
  gap: 60px;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? scaleIn : 'none'} 0.8s ease-out ${props => props.$delay || '0s'} forwards;
  
  @media (min-width: 969px) {
    &:hover {
      img {
        transform: scale(1.05) rotate(2deg);
      }
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 24px;
  transition: transform 0.5s ease;
  max-height: 600px;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const ImageLabel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    bottom: 12px;
    left: 12px;
    padding: 8px 14px;
    gap: 8px;
  }
`;

const LabelIcon = styled.span`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LabelText = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TextCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out ${props => props.$delay || '0s'} forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 28px;
  }
  
  @media (max-width: 486px) {
    padding: 20px;
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 20px 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 486px) {
    font-size: 1.3rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
  line-height: 1.8;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  
  strong {
    color: #ffa726;
    font-weight: 600;
  }
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 16px;
  }
  
  @media (max-width: 486px) {
    font-size: 0.85rem;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 28px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-top: 20px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 167, 38, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(255, 167, 38, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 167, 38, 0.15);
    transform: translateX(8px);
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }
`;

const FeatureIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureText = styled.span`
  font-size: 1rem;
  color: #e2e8f0;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StorySection = styled.div`
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, rgba(255, 111, 0, 0.05) 100%);
  border: 2px solid rgba(255, 167, 38, 0.3);
  border-radius: 24px;
  padding: 50px;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? scaleIn : 'none'} 0.8s ease-out ${props => props.$delay || '0s'} forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 167, 38, 0.1) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    padding: 32px;
  }
  
  @media (max-width: 486px) {
    padding: 24px;
  }
`;

const StoryContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
  }
`;

const StoryIcon = styled.div`
  color: #ffa726;
  flex-shrink: 0;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    svg {
      width: 36px;
      height: 36px;
    }
  }
`;

const StoryText = styled.p`
  font-size: 1.2rem;
  color: #e2e8f0;
  line-height: 1.9;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
  
  @media (max-width: 486px) {
    font-size: 0.9rem;
  }
`;

const PartnershipBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
    margin-top: 24px;
  }
`;

const BadgeIcon = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BadgeContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BadgeSubtitle = styled.span`
  font-size: 0.9rem;
  color: #94a3b8;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const MissionCard = styled.div`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? scaleIn : 'none'} 0.8s ease-out ${props => props.$delay || '0s'} forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    animation: ${pulse} 5s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    padding: 36px;
  }
  
  @media (max-width: 486px) {
    padding: 28px;
  }
`;

const MissionIcon = styled.div`
  color: #10b981;
  margin: 0 auto 24px;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    
    svg {
      width: 48px;
      height: 48px;
    }
  }
`;

const MissionTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 24px 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 486px) {
    font-size: 1.6rem;
  }
`;

const MissionText = styled.p`
  font-size: 1.3rem;
  color: #d1fae5;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.7;
  }
  
  @media (max-width: 486px) {
    font-size: 0.95rem;
  }
`;

export default AboutSection;