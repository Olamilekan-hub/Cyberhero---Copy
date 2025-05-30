import styled from "styled-components";
import Hexagon from "react-hexagon";

const CurrencyItem = ({ text, img, handleOnClick, active }) => {
  return (
    <MainContainer onClick={handleOnClick}>
      <HexagonContainer
        flatTop={true}
        style={{
          stroke: "#f0f0f0",
          strokeWidth: active ? 12 : 4,
          fill: active ? "var(--green)" : "var(--cyan)",
        }}
      />
      <ContentContainer>
        <p>{text}</p>
        {/* <p>
      what happens when text is huge what happens is it
      broken? idk lol
    </p> */}
        <Img src={img} alt={`${text} currency`} />
      </ContentContainer>
    </MainContainer>
  );
};

export default CurrencyItem;

const MainContainer = styled.div`
  position: relative;
  width: 150px;
  margin: 10px;
  /* height: 150px; */
  :hover {
    cursor: pointer;
  }
`;
const HexagonContainer = styled(Hexagon)`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;

  p {
    max-width: 85px;
    margin-bottom: 5px;
    height: 35px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
`;

const Img = styled.img`
  /* margin: 10px; */
  width: 60px;
  height: 60px;
  /* border-radius: 50%; */
`;
