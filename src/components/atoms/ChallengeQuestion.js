import styled from "styled-components";
import Hexagon from "react-hexagon";

const ChallengeQuestion = ({
  text,
  handleOnClick,
  disabled,
  index,
  correct,
  selected,
  wrong,
}) => {
  const getColor = () => {
    switch (true) {
      case correct:
        return "var(--green)";
      case wrong:
        return "red";
      case selected:
        return "var(--cyan)";
      default:
        return "var(--trans-grey)";
    }
  };

  return (
    <MainContainer onClick={disabled ? null : () => handleOnClick(index)}>
      <HexagonContainer
        flatTop={true}
        style={{ stroke: "transparent", fill: getColor() }}
      />
      <TextContainer>
        <p>{text}</p>
        {/* <p>
          what happens when text is huge what happens is it
          broken? idk lol
        </p> */}
      </TextContainer>
    </MainContainer>
  );
};

export default ChallengeQuestion;

const MainContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  :hover {
    cursor: pointer;
  }
`;
const HexagonContainer = styled(Hexagon)`
  height: 100%;
  width: 100%;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  p {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    letter-spacing: -0.3px;
  }
`;
