import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Header from "./New";
// import { SolidButton } from "../UI/Buttons";


const Div = styled.div`
  background: rgba(255, 255, 255, 0.4) !important;
  height: full;
`;

// -------------------- Animations --------------------
const progressiveBlur = keyframes`
  0% {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
`;

// -------------------- Styled Components --------------------
const HeroWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  min-height: 100vh;
  z-index: 10;
  background: radial-gradient(
      ellipse 120% 80% at 50% -10%,
      rgba(57, 57, 199, 0.08),
      transparent 60%
    ),
    radial-gradient(
      ellipse 80% 60% at 80% 120%,
      rgba(120, 119, 198, 0.05),
      transparent 50%
    );
`;

const HoverBoxesContainer = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.3;
  pointer-events: auto;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1200px;
  width: 85%;
  perspective: 1000px;
  transform-style: preserve-3d;
  min-height: 100vh;
  z-index: 20;
`;

const Section = styled.section`
  padding: 1rem;
  margin-top: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 30;
  flex-shrink: 0;
`;

const HeroElement = styled.div`
  opacity: 0;
  filter: blur(12px);
  transform: translateY(12px);
  &.animate-progressive-blur {
    animation: ${progressiveBlur} 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const Badge = styled(HeroElement)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-radius: 9999px;
  background: #e3e3e3;
  width: max-content;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;

  img {
    width: 2rem;
    border-radius: 50%;
    padding: 0.25rem;
    background: white;
  }

  p {
    margin-right: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }
`;

const Title = styled(HeroElement)`
  text-align: center;
  font-weight: 700;
  font-size: 42px;
  line-height: 48px;
  margin-bottom: 1rem;
  @media (min-width: 1024px) {
    font-size: 64px;
    line-height: 64px;
  }
`;

const Subtitle = styled(HeroElement)`
  max-width: 600px;
  text-align: center;
  font-size: 16px;
  color: #000;
  margin-bottom: 1.2rem;
`;

const ButtonContainer = styled(HeroElement)`
  margin-top: 0.75rem;
`;

const ImageContainer = styled(HeroElement)`
  width: 100%;
  margin-top: -2rem;
  display: flex;
  align-items: end;
  justify-content: center;
  position: relative;
  z-index: 20;
`;

const ScrollCard = styled.div`
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
  width: 100%;
  position: relative;
`;

const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, transparent 60%, #f5f5f5 100%);
  z-index: 10;
`;

const ImageInner = styled.div`
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
`;

// -------------------- Component --------------------
export const Hero = ({ onOpenModal }) => {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Handle animations on mount
  useEffect(() => {
    const elements = [
      { ref: badgeRef, delay: 200 },
      { ref: titleRef, delay: 350 },
      { ref: subtitleRef, delay: 500 },
      { ref: buttonRef, delay: 650 },
      { ref: imageRef, delay: 800 },
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.classList.add("animate-progressive-blur");
        }, delay);
      }
    });
  }, []);

  // 3D scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !cardRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.6))
      );
      const eased = scrollProgress * scrollProgress;
      const rotate = 25 - eased * 25;
      const scale = 1.05 - eased * 0.05;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotate}deg) scale(${scale})`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header onOpenModal={onOpenModal} />
      <HeroWrapper>
        <Backdrop>
          <HoverBoxesContainer />
        </Backdrop>

        <Container ref={containerRef}>
          <Section>
            <Badge ref={badgeRef}>
              <img src="/assets/Sheild.png" alt="Shield" />
              <p>Smart, Safe, Seamless</p>
            </Badge>

            <Title ref={titleRef}>
              Seamless Identity Verification for Nigerian Businesses
            </Title>

            <Subtitle ref={subtitleRef}>
              Verify identities, documents, and transactions in seconds. Simple, secure, and built for everyone.
            </Subtitle>

            <ButtonContainer ref={buttonRef}>
              {/* <SolidButton Text="Book a Call" textSize="text-lg" customShadow /> */}
            </ButtonContainer>
          </Section>

          <ImageContainer ref={imageRef}>
            <ScrollCard ref={cardRef}>
              <ImageOverlay />
              <ImageInner>
                <img src="/group.png" alt="Dashboard Preview" />
              </ImageInner>
            </ScrollCard>
          </ImageContainer>
        </Container>
      </HeroWrapper>
    </>
  );
};
