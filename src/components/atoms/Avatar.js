import React from "react";
import styled from "styled-components";

const Avatar = ({ img, width, height, character, human, pet }) => {
  return (
    <Image
      src={img}
      width={width}
      height={height}
      character={character}
      human={human}
      pet={pet}
      alt=""
    />
  );
};

export default Avatar;

const Image = styled.img`
  height: 50%;
  // width: 50%;
  ${({ character }) => character && "height: 100%; width: 100%;"}
  ${({ human }) => human && "height: 100%; width: 100%;"}
  ${({ pet }) => pet && "height: 60%; width: 100%;"}
  @media (min-width: 426px) {
    width: 80%;
    height: 80%;
    ${({ character }) => character && "height: 100%; width: 100%;"}
    ${({ human }) => human && "height: 100%; width: 100%;"}
    ${({ pet }) => pet && "height: 60%; width: 100%;"}
  }
  @media (min-width: 769px) {
    height: 100%;
    width: 100%;
   ${({ character }) => character && "height: 100%; width: 100%;"}
    ${({ human }) => human && "height: 100%; width: 100%;"}
    ${({ pet }) => pet && "height: 60%; width: 100%;"}
  }
`;
