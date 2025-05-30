import styled from "styled-components";
import missionFrame_sm from "../../assets/mobile_containts-44.png";
import missionFrame_md from "../../assets/mobile_containts-45.png";
import missionFrame_lg from "../../assets/mobile_containts-46.png";
import borderBG from "../../assets/borderBG.png";
import borderBG2 from "../../assets/borderBG2.png";

const DoubleBorderFrame = ({
  children,
  width,
  containerType,
  useMissionFrame,
  padding,
  bgColor,
  radius,
  center,
  HQ,
  character,
}) => {
  return (
    <MainContainer
      width={width}
      containerType={containerType}
      useMissionFrame={useMissionFrame}
      padding={padding}
      bgColor={bgColor}
      radius={radius}
      center={center}
      HQ={HQ}
      character={character}
    >
      {children}
    </MainContainer>
  );
};

export default DoubleBorderFrame;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
   ${({ containerType }) =>
     containerType !== 2 && "background: rgba(0, 0, 139, 0.4);"}  
  background-image: ${({ containerType }) => {
    switch (containerType) {
      case 1:
        return `url(${borderBG})`;
      case 2:
        return `url(${borderBG2})`;
      default:
        return `url(${borderBG})`;
    }
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 50px 10px;
  ${({ padding }) =>
    padding && `padding: ${padding * 0.5}px ${padding * 0.2}px`};

  ${({ center }) => center && `align-items: center;`}
  clip-path: ${({ containerType }) => {
    switch (containerType) {
      case 1:
        return `polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%,97% 100%, 3% 100%, 0% 97%, 0% 3%)`;
      case 2:
        return `polygon( 3% 0%,97% 0%,100% 3%,100% 97%,97% 100%,3% 100%,0% 97%,0% 3% )`;
      default:
        return `polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%,97% 100%, 3% 100%, 0% 97%, 0% 3%)`;
    }
  }};
    ${({ useMissionFrame }) =>
      useMissionFrame &&
      `background-image: url(${missionFrame_sm}); clip-path: polygon(2% 0%,98% 0%,100% 1%,100% 99%,98% 100%,2% 100%,0% 99%,0% 1%)`};
    @media (min-width: 426px) {
    padding: 50px 20px;
    ${({ HQ }) => HQ && "padding: 30px 25px;"}
    ${({ character }) => character && "padding: 50px 10px"};
    ${({ padding }) => padding && `padding: ${padding * 0.5}px`};
  }
  @media (min-width: 769px) {
    padding: 50px 30px;
    ${({ padding }) => padding && `padding: ${padding * 0.8}px`};
    ${({ width }) => width && `width: ${width}`};
    ${({ useMissionFrame }) =>
      useMissionFrame &&
      `background-image: url(${missionFrame_md});  clip-path: polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%,98% 100%, 2% 100%, 0% 98%, 0% 2%)`};
  }
  @media (min-width: 1025px) {
    padding: 50px;
    ${({ padding }) => padding && `padding: ${padding}px`};
    ${({ useMissionFrame }) =>
      useMissionFrame &&
      `background-image: url(${missionFrame_lg});  clip-path: polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%,98% 100%, 2% 100%, 0% 98%, 0% 2%)`};
  }

`;
