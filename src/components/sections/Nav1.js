import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../atoms/Button";
import {  AiOutlineShoppingCart } from "react-icons/ai";
import { onLogout } from "../../redux/managers/authManager";
import { navRoutes } from "../../constants/routes";
import logo from "../../assets/logo.png";
import arror_less from "../../assets/arrow_less.svg";
import closeIcon from "../../assets/close.svg";
import bar from "../../assets/bar.png";
import SoundButton from "../atoms/SoundButton";
const Nav = ({ history, signedIn, dispatch, cartTotal, toggleCart }) => {
  const [open, toggleOpen] = useState(true);
  const [account, setAccount] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const filteredRoutes = navRoutes.filter((item) =>
    signedIn ? !!item.private : !item.private
  );

  // Closes hamburger menu on location change, and sets Active nav route
  // based on current pathname
  useEffect(
    () => {
      if (open) {
        toggleOpen(false);
      }
      // console.log(history.location);
      if (history.location.pathname === "/") return setActiveRoute("/");
      if (history.location.pathname === "/profile")
        return setActiveRoute("/profile");
      const homelessRoutes = filteredRoutes.filter((item) => item.path !== "/");
      homelessRoutes.forEach(
        (route) =>
          history.location.pathname.includes(route.path) &&
          setActiveRoute(route.path)
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history.location]
  );

  const handleLogout = () => {
    dispatch(onLogout(history));
  };

  return (
    <StyledNav>
      <InnerLinks open={open}>
        {open && (
          <SoundButton>
            <IconButton onClick={() => toggleOpen(false)} close>
              <img src={closeIcon} width={20} alt="" />
            </IconButton>
          </SoundButton>
        )}
        <LinkContainer>
          {filteredRoutes.map((route, index) =>
            route.text === "SHOP" ? (
              <SoundButton>
                <StyledA href={route.path} key={index} target="_blank">
                  {route.text}
                </StyledA>
              </SoundButton>
            ) : (
              <SoundButton>
                <StyledLink
                  to={route.path}
                  key={index}
                  active={activeRoute === route.path ? 1 : 0}
                >
                  {route.text}
                </StyledLink>
              </SoundButton>
            )
          )}
        </LinkContainer>
        <SpecialLinkContainer>
          {signedIn ? (
            <>
              <SoundButton>
                <StyledLink
                  to="/profile"
                  active={activeRoute === "/profile" ? 1 : 0}
                >
                  PROFILE
                </StyledLink>
              </SoundButton>
              <SoundButton>
                <StyledLink to="/" onClick={handleLogout}>
                  LOG OUT
                </StyledLink>
              </SoundButton>
            </>
          ) : (
            <>
              <SoundButton>
                <StyledLink
                  to="/login"
                  active={activeRoute === "/login" ? 1 : 0}
                >
                  LOGIN
                </StyledLink>
              </SoundButton>
              <SoundButton>
                <StyledLink
                  to="/register"
                  active={activeRoute === "/register" ? 1 : 0}
                >
                  REGISTER
                </StyledLink>
              </SoundButton>
            </>
          )}
        </SpecialLinkContainer>
      </InnerLinks>
      {!open && (
        <>
          <MobileCartButton onClick={toggleCart}>
            <AiOutlineShoppingCart size={30} color="white" />
            {<p>CART({cartTotal})</p>}
          </MobileCartButton>
          <SoundButton>
            <IconButton onClick={() => toggleOpen(true)}>
              <div>
                <img src={bar} width={25} alt="" />
              </div>
            </IconButton>
          </SoundButton>
        </>
      )}
      <SoundButton>
        <LogoContainer>
          <a href="/">
            <img src={logo} alt="Mission: G.A.I.A. Crest" />
          </a>
        </LogoContainer>
      </SoundButton>
      <ButtonContainer>
        {signedIn ? (
          <>
            <AccountContainer
              onMouseEnter={() => setAccount(true)}
              onMouseLeave={() => setAccount(false)}
            >
              <ArrowContainer>
                <img src={arror_less} alt="not found" />
                <span>Account</span>
              </ArrowContainer>
              <ButtonColumn
                account={account}
                onMouseOver={() => setAccount(true)}
              >
                <SoundButton>
                  <Button
                    text="Log out"
                    handleOnClick={handleLogout}
                    height={35}
                  />
                </SoundButton>
                <Link to="/profile">
                  <SoundButton>
                    <Button text="Profile" height={35} />{" "}
                  </SoundButton>
                </Link>
              </ButtonColumn>
            </AccountContainer>
          </>
        ) : (
          <>
            <Link to="/login">
              <SoundButton>
                <Button text="Log in" height={30} />
              </SoundButton>
            </Link>
            <Link to="/register">
              <SoundButton>
                <Button text="Sign up" height={30} />
              </SoundButton>
            </Link>
          </>
        )}
        <CartButton onClick={toggleCart}>
          <AiOutlineShoppingCart size={30} color="white" />
          {<p>CART({cartTotal})</p>}
        </CartButton>
      </ButtonContainer>
    </StyledNav>
  );
};

export default withRouter(Nav);

const StyledNav = styled.nav`
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: var(--nav-height);
  background-color: var(--nav-color);
  z-index: 3;
`;

const InnerLinks = styled.div`
  position: fixed;
  top: 0;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--nav-color-solid);
  padding-top: 100px;
  z-index: 3;

  @media (min-width: 1268px) {
    display: flex;
    position: absolute;
    top: 50%;
    right: 400px;
    width: fit-content;
    height: initial;
    padding-top: 0;
    background-color: transparent;
    transform: translateY(-50%);
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  // half of width
  left: 10px;
  transform: translate(0, -50%);
  img {
    height: 15px;
  }
  @media (min-width: 426px) {
    left: 25px;
    img{
      height: 20px;
    }
  }
  @media (min-width: 769px) {
    left: 25px;
    img{
      height: 30px;
    }
  }
`;
const IconButton = styled.button`
  position: absolute;
  right: 10px;
  padding: 0;
  ${({ close }) => !close && "top: 50%;"}
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 40px;
  width: 40px;
  font-size: 40px;
  border: none;
  cursor: pointer;
  color: white;
  border: 1px solid white;
  transform: translate(0, -50%);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    filter: invert(1);
  }
  @media (min-width: 1268px) {
    display: none;z
  }
  @media (min-width: 426px) {
    right: 25px;
  }
`;
const CartButton = styled.button`
  position: absolute;
  right: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  p {
    display: none;
    color: white;
    margin-left: 5px;
  }
  @media (min-width: 425px) {
    right: 75px;
    p {
      display: flex;
    }
  }
  @media (min-width: 1268px) {
    position: relative;
    right: 0;
  }
`;

const MobileCartButton = styled(CartButton)`
  @media (min-width: 1268px) {
    display: none;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1268px) {
    gap: 52px;
    flex-direction: row;
  }
`;

const SpecialLinkContainer = styled(LinkContainer)`
  @media (min-width: 1268px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ active }) => (active ? "var(--cyan)" : "white")};
  margin: 10px;
  width: 100%;
  text-align: center;
  font-size: 24px;

  :active,
  :focus {
    outline: 0;
    border: none;
    outline-style: none;
    -moz-outline-style: none;
  }

  @media (min-width: 800px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    width: auto;
    padding: 5px;
  }
  @media (min-width: 1268px) {
    margin: 0 20px;
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: ${({ active }) => (active ? "var(--cyan)" : "white")};
  margin: 10px;
  width: 100%;
  text-align: center;
  font-size: 24px;

  :active,
  :focus {
    outline: 0;
    border: none;
    outline-style: none;
    -moz-outline-style: none;
  }

  @media (min-width: 800px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    width: auto;
    padding: 5px;
  }
  @media (min-width: 1268px) {
    margin: 0 20px;
  }
`;

const ButtonContainer = styled.div`
  display: none;
  flex-direction: row;
  position: absolute;
  right: 20px;
  z-index: 3;
  a {
    text-decoration: none;
    color: white;
  }
  a:active,
  a:focus {
    outline: 0;
    border: none;
    outline-style: none;
    -moz-outline-style: none;
  }
  @media (min-width: 1268px) {
    display: flex;
    align-items: center;
  }
`;
const AccountContainer = styled.div`
  margin: 0 32px;
  padding: 16px 0;
  cursor: pointer;
`;
const ButtonColumn = styled.div`
  position: absolute;
  top: 100%;
  transform: translateX(-12%);
  display: ${({ account }) => (account === true ? "flex" : "none")};
  flex-direction: column;
`;

const ArrowContainer = styled.div`
  display: flex;
  gap: 8px;
`;
