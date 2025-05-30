import React from "react";
import styled from "styled-components";

export default function Badge({ image, alt, active, empty }) {
  // console.log("Badge", image);
  return empty ? <Empty /> : <BadgeImg src={image} alt={alt} active={active} />;
}
//TODO: These might have to be min-width and min-height if the scale of the badges doesnt work with the overflow-x: scroll from BadgeCarouselContainer. If min in here doesnt work then find the parent container they live in inside BadgeCarouselContainer.
const BadgeImg = styled.img`
  border-radius: 50%;
  ${({ active }) =>
    active &&
    "border: 3px solid var(--cyan) !important;box-shadow: 0px 0px 7px 0px #d47018;"}
   width: 40px !important;
  height: 40px !important;
  transition: all 0.2s ease-in-out;
   @media (min-width: 426px) {
    margin: 10px;
    width: 55px !important;
    height: 55px !important;
  }
  @media (min-width: 768px) {
    margin: 10px;
    width: 75px !important;
    height: 75px !important;
  }
`;

const Empty = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 40px !important;
  height: 40px !important;
  background-color: var(--cyan);
  border-radius: 50%; 
   @media (min-width: 426px) {
    margin: 10px;
    width: 55px !important;
    height: 55px !important;
  }
  @media (min-width: 768px) {
    margin: 10px;
    width: 75px !important;
    height: 75px !important;
  }
`;
