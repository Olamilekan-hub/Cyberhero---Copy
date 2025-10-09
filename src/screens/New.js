import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
// import { SolidButton } from "../UI/Buttons";

const slideDown = keyframes`
  0% { opacity: 0; transform: translateY(-100px); filter: blur(8px); }
  60% { opacity: 1; transform: translateY(15px); filter: blur(1px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
`;

const menuSlide = keyframes`
  0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
  60% { opacity: 1; transform: translateY(5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const menuExit = keyframes`
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-15px) scale(0.96); }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s ease;
  ${(props) => (props.scrolled ? "top: 0;" : "top: 2rem;")}
  width: 100%;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  padding: ${(p) => (p.scrolled ? "0.5rem 4rem" : "0.5rem 0")};
  max-width: ${(p) => (p.scrolled ? "" : "1200px")};
  width: ${(p) => (p.scrolled ? "100%" : "80%")};
  border-radius: ${(p) => (p.scrolled ? "0px" : "9999px")};
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: ${(p) => (p.scrolled ? "blur(10px)" : "none")};
  box-shadow: none;
  animation: ${slideDown} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const Logo = styled.img`
  width: 10%;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.nav`
  display: none;
  gap: 24px;
  align-items: center;

  @media (min-width: 1024px) {
    display: flex;
  }

  a {
    color: #333;
    font-weight: 500;
    font-size: 15px;
    padding: 0 10px;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #3939c7;
    }
  }
`;

const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 8px;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 1024px) {
    display: none;
  }

  .line {
    display: block;
    height: 2px;
    width: 24px;
    background: #333;
    margin: 4px 0;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  ${(p) =>
    p.open &&
    css`
      .line:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
      }
      .line:nth-child(2) {
        opacity: 0;
      }
      .line:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
      }
    `}
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid #f3f3f3;
  animation: ${menuSlide} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    a {
      font-weight: 600;
      color: #333;
      text-decoration: none;
      transition: all 0.3s;
      &:hover {
        color: #3939c7;
        transform: translateX(4px) scale(1.05);
      }
    }
  }
`;

const Header = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <HeaderWrapper scrolled={isScrolled}>
      <HeaderContainer scrolled={isScrolled}>
        <Flex>
          <a href="/">
            <Logo src="/assets/Logo.png" alt="MissionGaia Logo" />
          </a>

          <NavLinks>
            <a href="/about">About</a>
            <a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection("how"); }}>How it works</a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a>
            <a href="#use" onClick={(e) => { e.preventDefault(); scrollToSection("use"); }}>Use Cases</a>
          </NavLinks>

          <div className="hidden lg:block" onClick={onOpenModal}>
            {/* <SolidButton Text="Book a call" textSize="text-sm" /> */}
          </div>

          <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)} open={isMenuOpen}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </HamburgerButton>

          {isMenuOpen && (
            <MobileMenu ref={menuRef}>
              <nav>
                <a href="/about">About</a>
                <a href="#how" onClick={(e) => { e.preventDefault(); scrollToSection("how"); setIsMenuOpen(false); }}>How it works</a>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); setIsMenuOpen(false); }}>Features</a>
                <a href="#use" onClick={(e) => { e.preventDefault(); scrollToSection("use"); setIsMenuOpen(false); }}>Use Cases</a>
                <div onClick={onOpenModal}>
                  {/* <SolidButton Text="Book a call" textSize="text-sm" /> */}
                </div>
              </nav>
            </MobileMenu>
          )}
        </Flex>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
export default Header