import styled from "styled-components";

const SingleBorderFrame = ({
  children,
  width,
  pcSize,
  tabletSize,
  mobileSize,
  height,
  useFilled,
  flexDir = "column",
  bgColor,
  border,
  space,
  overflow,
  crestBoard,
}) => {
  return (
    <MainContainer
      width={width}
      pcSize={pcSize}
      tabletSize={tabletSize}
      mobileSize={mobileSize}
      height={height}
      useFilled={useFilled}
      flexDir={flexDir}
      bgColor={bgColor}
      border={border}
      space={space}
      overflow={overflow}
      crestBoard={crestBoard}
    >
      {children}
    </MainContainer>
  );
};
SingleBorderFrame.defaultProps = {
  width: "80%",
};

export default SingleBorderFrame;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  border: 2px solid #008d8d;
  margin: auto;
  padding: 4px;
  ${({ flexDir }) =>
    flexDir ? `flex-direction: ${flexDir}` : "flex-direction: column"};
  ${({ space }) =>
    space ? `justify-content: ${space}` : "justify-content:space-evenly"};
  ${({ border }) => border && border};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `min-height: ${height}`};
  ${({ bgColor }) =>
    bgColor ? `background: ${bgColor}` : `background: rgba(0, 0, 139, 0.2);`};
  ${({ overflow }) => overflow && overflow}
  @media (min-width: 425px) {
    padding: 15px 10px;
  }
  @media (min-width: 768px) {
    ${({ tabletSize }) => tabletSize && `width: ${tabletSize}`};
  }
  @media (min-width: 1024px) {
    ${({ pcSize }) => pcSize && `width: ${pcSize}`};
  }
  @media (max-width: 768px) {
    ${({ mobileSize }) => mobileSize && `width: ${mobileSize}`};
    ${({ crestBoard }) => crestBoard && "padding: 0;"}
  }
`;
