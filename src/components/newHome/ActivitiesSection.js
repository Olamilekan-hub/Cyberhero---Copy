import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ActivityTodoList from './ActivityTodoList';

const ActivitiesSection = () => {
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

  const activityTodos = [
    [
      { label: "🧭 Find one green thing.", key: "nature-green", answer: false },
      { label: "What shape is it?", key: "nature-shape", answer: true },
      { label: "What does it feel like?", key: "nature-feel", answer: true }
    ],
    [
      { label: "👀 Close your eyes for 20 seconds.", key: "sound-close", answer: false },
      { label: "Name three sounds.", key: "sound-name", answer: true },
      { label: "Which are wild?", key: "sound-wild", answer: true },
      { label: "Which are human-made?", key: "sound-human", answer: true }
    ],
    [
      { label: "I drink the sun and never walk. What am I❓", key: "eco-riddle", answer: true }
    ]
  ];

  const activities = [
    {
      icon: "🔍",
      title: "30-Second Nature Scout",
      color: "#10b981",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)",
      borderColor: "rgba(16, 185, 129, 0.3)",
      todos: activityTodos[0]
    },
    {
      icon: "🔊",
      title: "Sound Map",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      todos: activityTodos[1]
    },
    {
      icon: "💡",
      title: "Eco-Riddle",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)",
      borderColor: "rgba(245, 158, 11, 0.3)",
      todos: activityTodos[2]
    }
  ];

  return (
    <Wrapper ref={sectionRef}>
      <BackgroundDecoration>
        <DecorCircle style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
        <DecorCircle style={{ top: '70%', right: '8%', animationDelay: '2s' }} />
        <DecorCircle style={{ top: '40%', right: '15%', animationDelay: '4s' }} />
      </BackgroundDecoration>
      
      <Container>
        <Header $isVisible={isVisible}>
          <TaglineWrapper $isVisible={isVisible}>
            <TaglineIcon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor"/>
              </svg>
            </TaglineIcon>
            <Tagline>Available Now</Tagline>
          </TaglineWrapper>
          <Title $isVisible={isVisible}>Right now: <TitleHighlight>B.E.L.A.</TitleHighlight></Title>
          <Subtitle $isVisible={isVisible}>
            Try these simple, login-free activities that get kids outside and curious about the natural world.
          </Subtitle>
          <Divider $isVisible={isVisible} />
        </Header>

        <Grid>
          {activities.map((activity, idx) => (
            <ActivityCard 
              key={activity.title}
              $isVisible={isVisible}
              $delay={0.2 + idx * 0.15}
              $gradient={activity.gradient}
              $borderColor={activity.borderColor}
            >
              <CardHeader>
                <IconWrapper $color={activity.color}>
                  <Icon>{activity.icon}</Icon>
                  <IconGlow $color={activity.color} />
                </IconWrapper>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityNumber>Activity {idx + 1}</ActivityNumber>
              </CardHeader>
              
              <CardContent>
                <ActivityTodoList activityIdx={idx} todos={activity.todos} />
              </CardContent>
              
              <CardFooter>
                <ProgressBar>
                  <ProgressLabel>Progress</ProgressLabel>
                  <ProgressTrack>
                    <ProgressFill style={{ width: '0%' }} />
                  </ProgressTrack>
                </ProgressBar>
              </CardFooter>
            </ActivityCard>
          ))}
        </Grid>

        <CTASection $isVisible={isVisible}>
          <CTAContent>
            <CTAIcon>✨</CTAIcon>
            <CTAText>
              <CTATitle>Want more activities?</CTATitle>
              <CTASubtitle>The B.E.L.A. app is coming soon with dozens of missions and challenges!</CTASubtitle>
            </CTAText>
            <CTAButton>
              <span>Get Notified</span>
              <ButtonArrow>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonArrow>
            </CTAButton>
          </CTAContent>
        </CTASection>
      </Container>
    </Wrapper>
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

const fadeInScale = keyframes`
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
    transform: translateY(-15px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
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
    width: 100px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 120px 0;
  position: relative;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.5) 100%);
  overflow: hidden;
  
  @media (max-width: 968px) {
    padding: 80px 0;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const DecorCircle = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 167, 38, 0.1) 0%, transparent 70%);
  animation: ${float} 8s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
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
    margin-bottom: 50px;
  }
`;

const TaglineWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.15) 0%, rgba(255, 111, 0, 0.1) 100%);
  border: 1px solid rgba(255, 167, 38, 0.3);
  padding: 10px 20px;
  border-radius: 24px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out forwards;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    gap: 8px;
  }
`;

const TaglineIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffa726;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const Tagline = styled.span`
  font-size: 0.95rem;
  color: #ffa726;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  color: #ffffff;
  line-height: 1.2;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.2s forwards;
  
  @media (max-width: 968px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 486px) {
    font-size: 1.8rem;
  }
`;

const TitleHighlight = styled.span`
  background: linear-gradient(135deg, #ffa726 0%, #ff6f00 50%, #ffa726 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.3s forwards;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
  
  @media (max-width: 486px) {
    font-size: 0.95rem;
  }
`;

const Divider = styled.div`
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #ffa726 50%, transparent 100%);
  margin: 0 auto;
  border-radius: 2px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? expandWidth : 'none'} 1s ease-out 0.5s forwards;
  width: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 60px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const ActivityCard = styled.div`
  background: ${props => props.$gradient};
  border: 2px solid ${props => props.$borderColor};
  border-radius: 24px;
  padding: 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  overflow: hidden;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInScale : 'none'} 0.8s ease-out ${props => props.$delay}s forwards;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border-color: #ffa726;
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-6px);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 24px 20px 20px;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
  border: 3px solid rgba(255, 255, 255, 0.3);
  
  ${ActivityCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2.4rem;
  }
  
  @media (max-width: 486px) {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
`;

const IconGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.3;
  animation: ${pulse} 3s ease-in-out infinite;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ActivityTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
  
  @media (max-width: 486px) {
    font-size: 1.15rem;
  }
`;

const ActivityNumber = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const CardContent = styled.div`
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 486px) {
    padding: 16px;
  }
`;

const CardFooter = styled.div`
  padding: 20px 24px;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
  
  @media (max-width: 486px) {
    padding: 14px 16px;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressLabel = styled.span`
  font-size: 0.85rem;
  color: #cbd5e1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 6px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const CTASection = styled.div`
  margin-top: 80px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.8s forwards;
  
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const CTAContent = styled.div`
  background: linear-gradient(135deg, rgba(255, 167, 38, 0.15) 0%, rgba(255, 111, 0, 0.1) 100%);
  border: 2px solid rgba(255, 167, 38, 0.3);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.25);
    border-color: #ffa726;
  }
  
  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    padding: 32px;
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
  }
`;

const CTAIcon = styled.div`
  font-size: 4rem;
  flex-shrink: 0;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 968px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CTAText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  
  @media (max-width: 968px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 486px) {
    font-size: 1.3rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
  margin: 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 486px) {
    font-size: 0.9rem;
  }
`;

const ButtonArrow = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  transition: transform 0.3s ease;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ffa726 0%, #ff6f00 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 18px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(255, 167, 38, 0.4);
  transition: all 0.3s ease;
  flex-shrink: 0;
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
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(255, 167, 38, 0.5);
    
    &::before {
      left: 100%;
    }
    
    ${ButtonArrow} {
      transform: translateX(4px);
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  @media (max-width: 968px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
  
  @media (max-width: 486px) {
    padding: 12px 24px;
    font-size: 0.95rem;
  }
`;

export default ActivitiesSection;