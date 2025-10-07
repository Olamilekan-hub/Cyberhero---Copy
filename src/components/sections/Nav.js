import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const location = useLocation();
  const activeRoute = location.pathname;
  const navLinks = [
    { text: "Home", path: "/" },
    { text: "B.E.L.A.", path: "#bela" },
    { text: "About us", path: "#about" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use both pageYOffset and scrollY for compatibility
      const offset = window.pageYOffset || window.scrollY || 0;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StyledNav scrolled={scrolled}>
        <LogoText>MISSION: G.A.I.A.</LogoText>
        <RightSection>
          <NavLinks className="desktop-nav">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path}>
                <StyledNavLink
                  to={link.path}
                  active={activeRoute === link.path ? 1 : 0}
                >
                  {link.text}
                  {activeRoute === link.path && (
                    <ActiveIndicator>
                      <Underline />
                      <Dot />
                    </ActiveIndicator>
                  )}
                </StyledNavLink>
              </NavLinkItem>
            ))}
            <NavLinkItem>
              <StyledButtonLink to="/login" active={activeRoute === "/login" ? 1 : 0}>
                Log in
              </StyledButtonLink>
            </NavLinkItem>
            <NavLinkItem>
              <StyledButtonLink to="/register" active={activeRoute === "/register" ? 1 : 0}>
                Sign up
              </StyledButtonLink>
            </NavLinkItem>
          </NavLinks>
          <MenuButton onClick={() => setMenuOpen(true)} menuOpen={menuOpen}>
            <FiMenu size={32} />
          </MenuButton>
        </RightSection>
      </StyledNav>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div style={{ height: scrolled ? 80 : 80 }} />
      <MobileMenuBox menuOpen={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <FiX size={32} />
        </CloseButton>
        <MobileNavLinks>
          {navLinks.map((link) => (
            <StyledNavLink
              to={link.path}
              key={link.path}
              active={activeRoute === link.path ? 1 : 0}
              onClick={() => setMenuOpen(false)}
            >
              {link.text}
            </StyledNavLink>
          ))}
          <StyledButtonLink
            to="/login"
            active={activeRoute === "/login" ? 1 : 0}
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </StyledButtonLink>
          <StyledButtonLink
            to="/register"
            active={activeRoute === "/register" ? 1 : 0}
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </StyledButtonLink>
        </MobileNavLinks>
      </MobileMenuBox>
    </>
  );
};

export default Nav;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  min-width: 320px;
  height: 64px;
  background: ${({ scrolled }) =>
    scrolled
      ? "rgba(57, 38, 163, 0.4)"
      : "black"};
  backdrop-filter: ${({ scrolled }) =>
    scrolled ? "blur(12px)" : "none"};
  transition: background 0.3s, backdrop-filter 0.3s;
  border-radius: 0px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  box-sizing: border-box;

  @media (min-width: 480px) {
    height: 72px;
    padding: 0 10px;
  }
  @media (min-width: 768px) {
    height: 80px;
    padding: 0 10px;
  }
  @media (min-width: 1025px) {
    height: 100px;
    padding: 0 5rem;
  }
  @media (min-width: 1441px) {
    height: 100px;
    padding: 0 10rem;
  }
`;

const LogoText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin-right: 32px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media (min-width: 1025px) {
    font-size: 2rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    display: none;
  }
    @media (min-width: 1440px) {
    gap: 32px; 
  }
`;

const NavLinkItem = styled.li`
  position: relative;
`;

const StyledNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 400;
  position: relative;
  padding: 8px 0;
  margin: 0 12px;
  &:hover {
    color: #ffa726;
  }

  @media (min-width: 1440px) {
    font-size: 1.1rem;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Underline = styled.div`
  width: 32px;
  height: 4px;
  background: #ffa726;
  border-radius: 2px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: #ffa726;
  border-radius: 50%;
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const StyledButtonLink = styled(Link)`
  color: #fff;
  background: #ffa726;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  margin: 0 12px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  &:hover {
    background: #ff9800;
    color: #fff;
  }
    @media (min-width: 1440px) {
    padding: 12px 32px;
    font-size: 1rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 16px;
  @media (max-width: 767px) {
    display: ${({ menuOpen }) => (menuOpen ? "none" : "block")};
  }
`;

const MobileMenuBox = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100vw;
  background: #3926a3;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border-radius: 0 0 24px 24px;
  z-index: 100;
  display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-end;
  animation: fadeIn 0.3s ease;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin: 16px 24px 0 0;
`;

const MobileNavLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 0 32px 0;
`;
