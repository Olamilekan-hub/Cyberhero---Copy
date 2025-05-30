import { Link } from "react-router-dom";
import styled from "styled-components";

import SoundButton from "../../components/atoms/SoundButton";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLeftContainer>
        <Logo href="/">
          <img src={logo} alt="" />
          <span>©</span>
        </Logo>
        <Link to="/about">
          <SoundButton>About</SoundButton>
        </Link>
        <Link to="/terms">
          <SoundButton>Terms of Use</SoundButton>
        </Link>
      </FooterLeftContainer>
      <FooterRightContainer>
        <h2>Evolutionary Guidance Media R&D Inc.</h2>
        <p>203 Hudson Street, New York, NY 10013</p>
      </FooterRightContainer>
    </FooterContainer>
  );
};

export default Footer;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 20px;
  background-color: var(--trans-blue);
  @media (min-width: 769px) {
    padding: 30px 50px;
  }
`;

const FooterLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  gap: 16px;
  a {
    color: white;
    font-size: 8pt;
    text-decoration: none;
  }
  @media (min-width: 426px) {
    a {
      font-size: 10pt;
    }
  }
`;

const FooterRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  color: white;
  text-align: right;
  h2 {
    font-size: 8pt;
  }
  p {
    margin: 0;
    font-size: 8pt;
  }
  @media (min-width: 426px) {
    h2 {
      font-size: 10pt;
    }
    p {
      font-size: 10pt;
    }
  }
  @media (min-width: 769px) {
    h2 {
      font-size: 12pt;
    }
    p {
      font-size: 10pt;
    }
  }
`;

const Logo = styled.a`
  display: flex;
  height: 15px;
  margin-bottom: 8px;
  span {
    margin-top: -10px;
    font-size: 15px;
    color: red;
  }
  @media (min-width: 426px) {
    height: 20px;
    span {
      font-size: 20px;
    }
  }
  @media (min-width: 769px) {
    height: 25px;
    span {
      font-size: 25px;
    }
  }
  img {
    height: 100%;
  }
`;
