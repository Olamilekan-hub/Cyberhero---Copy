import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => {
  return (
    <MainContainer>
      <Loader type="Grid" color="#00BFFF" height={100} width={100} />
    </MainContainer>
  );
};

export default Loading;
const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;
