import React from "react";
import styled from "styled-components";

const Header = ({
  size,
  mobileSize,
  color,
  font,
  align,
  profile,
  children,
}) => {
  return (
    <HeaderText
      size={size}
      mobileSize={mobileSize}
      color={color}
      font={font}
      align={align}
    >
      {children}
    </HeaderText>
  );
};

export default Header;

const HeaderText = styled.h2`
  margin: 0.5em 0;
  ${({ color }) => (color ? `color: ${color}` : "color: var(--cyan)")};
  ${({ font }) => font && `font-family: ${font}`};
  ${({ size }) => size && `font-size: ${size}`};
  text-align: center;
  ${({ align }) => align && `text-align: ${align}`};

  @media (max-width: 425px) {
    font-size: ${({ mobileSize }) => mobileSize && `${mobileSize}px`};
    ${(profile) => profile && "font-size: 10px;"}
  }
  @media (max-width: 768px) {
    font-size: ${({ mobileSize }) => mobileSize && `${mobileSize * 1.2}px`};
  }
  @media (max-width: 1024px) {
    font-size: ${({ mobileSize }) => mobileSize && `${mobileSize * 1.3}px`};
  }
`;
