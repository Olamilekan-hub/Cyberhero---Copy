import React from "react";
import { BsShieldFill, BsShieldShaded } from "react-icons/bs";
import styled from "styled-components";

export default function Crest({ isFilled, mission }) {
  if (isFilled) return <ShieldFilled mission={mission} />;
  else return <Shield mission={mission} />;
}
Crest.defaultProps = {
  isFilled: true,
};

const ShieldFilled = styled(BsShieldShaded)`
  color: #0782CB;
  ${({ mission }) =>
    mission
      ? "width: 100%; height: 100%;"
      : "min-width: 40px; min-height: 40px;"}
  @media (min-width: 426px) {
     ${({ mission }) =>
       mission
         ? "width: 100%; height: 100%;"
         : "min-width: 56px; min-height: 56px;"}
  }
  @media (min-width: 769px) {
     ${({ mission }) =>
       mission
         ? "width: 100%; height: 100%;"
         : "min-width: 76px; min-height: 76px;"}
    }
`;
const Shield = styled(BsShieldFill)`
  color: #0782CB;
  ${({ mission }) =>
    mission
      ? "width: 100%; height: 100%;"
      : "min-width: 40px; min-height: 40px;"}
  @media (min-width: 426px) {
     ${({ mission }) =>
       mission
         ? "width: 100%; height: 100%;"
         : "min-width: 56px; min-height: 56px;"}
  }
  @media (min-width: 769px) {
     ${({ mission }) =>
       mission
         ? "width: 100%; height: 100%;"
         : "min-width: 76px; min-height: 76px;"}
    }
`;
