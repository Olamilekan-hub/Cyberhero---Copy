import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const BelaSection = () => {
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
    <Wrapper id='bela' ref={sectionRef}>
      <BackgroundBlur />
      <Content $isVisible={isVisible}>
        <TextContent $isVisible={isVisible}>
          <Tagline $isVisible={isVisible}>
            Meet <strong>B.E.L.A.</strong> from Chronicles of G.A.I.A.
          </Tagline>
          <Title $isVisible={isVisible}>B.E.L.A.</Title>
          <Description $isVisible={isVisible}>
            Meet <strong>B.E.L.A.</strong>—a playful, planet-positive companion from the Chronicles of G.A.I.A. universe. Think mini-missions and activities that help kids notice more, develop agency, and nurture a lifelong habit of caring for the living world.
          </Description>
          <Highlight $isVisible={isVisible}>
            <b>Coming soon:</b> The B.E.L.A App. While we build, we're sharing kid-safe, no-login experiences here.
          </Highlight>
        </TextContent>
        <ImageContainer $isVisible={isVisible}>
          <GlowEffect />
          <Image src="/BELA_1.png" alt="B.E.L.A." />
        </ImageContainer>
      </Content>
    </Wrapper>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const glow = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
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
  background: linear-gradient(135deg, rgba(50, 77, 139, 0.95) 0%, rgba(113, 157, 227, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto 0;
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
      radial-gradient(circle at 20% 50%, rgba(255, 167, 38, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%,  rgba(0, 11, 168, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const BackgroundBlur = styled.div`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 167, 38, 0.15) 0%, transparent 70%);
  filter: blur(80px);
  animation: ${glow} 4s ease-in-out infinite;
  pointer-events: none;
  
  @media (max-width: 968px) {
    width: 300px;
    height: 300px;
    top: 10%;
    right: 5%;
  }
`;

const Content = styled.section`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  padding: 100px 0;
  margin: auto 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1200px) {
    width: 90%;
    gap: 40px;
    padding: 80px 25px;
  }
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 50px;
    padding: 60px 20px;
  }
  @media (max-width: 768px) {
    width: 95%;
    padding: 40px 16px;
    gap: 40px;
  }
  @media (max-width: 486px) {
    width: 100%;
    padding: 30px 16px;
    gap: 30px;
  }
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInLeft : 'none'} 0.8s ease-out forwards;

  @media (max-width: 768px) {
    gap: 16px;
  }
  @media (max-width: 486px) {
    gap: 12px;
  }
`;

const Tagline = styled.p`
  font-size: 0.95rem;
//   color: #ffa726;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  padding-left: 20px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.2s forwards;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #ffa726 0%, #ff7043 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-left: 15px;
    
    &::before {
      height: 16px;
      width: 3px;
    }
  }
  @media (max-width: 486px) {
    font-size: 0.7rem;
    letter-spacing: 1px;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 30%,rgb(0, 11, 168) 60%, #ffa726 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.3s forwards,
             ${props => props.$isVisible ? shimmer : 'none'} 3s linear 1s infinite;
  
  @media (max-width: 1024px) {
    font-size: 4rem;
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 486px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.15rem;
  color: #cbd5e1;
  line-height: 1.8;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  text-align: left;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.4s forwards;
  
  strong {
    font-weight: 700;
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

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const Highlight = styled.p`
  font-size: 1.15rem;
  color:rgb(40, 45, 54);
  line-height: 1.6;
  font-weight: 600;
  font-family: Consolas;
//   display: flex;
  align-items: center;
  padding: 24px 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  margin-top: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.5s forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  b {
    color: #0f172a;
    font: bold;
  font-family: Courier New;
  }
  
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 18px 20px;
    margin-top: 20px;
  }
  @media (max-width: 486px) {
    font-size: 0.8rem;
    padding: 14px 16px;
    border-radius: 12px;
    margin-top: 15px;
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
//   max-width: 900px;
  width: auto;
  position: relative;
  opacity: ${props => props.$isVisible ? 1 : 0};
  animation: ${props => props.$isVisible ? fadeInRight : 'none'} 0.8s ease-out 0.4s forwards;
  
  @media (max-width: 968px) {
    max-width: 100%;
    animation: ${props => props.$isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.6s forwards;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(184, 120, 0) 10%, transparent 70%);
  filter: blur(60px);
  animation: ${glow} 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const Image = styled.img`
  width: 70%;
  height: auto;
  border-radius: 24px;
//   box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  max-height: 850px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
  animation: ${float} 6s ease-in-out infinite;
//   border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 1200px) {
    width: 75%;
  }
  @media (max-width: 968px) {
    width: 60%;
    max-height: 600px;
  }
  @media (max-width: 768px) {
    width: 70%;
    max-height: 500px;
  }
  @media (max-width: 486px) {
    width: 85%;
    max-height: 400px;
  }
`;

export default BelaSection;