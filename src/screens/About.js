import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onLanding } from "../redux/managers/pageManager";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import Footer from "../components/containers/Footer";
const About = ({ dispatch, pages }) => {
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    init();
    pages.pages.map((item) => {
      item.type === "About" && setPageData(item);
    });
  }, []);
  const init = async () => {
    try {
      setLoading(true);
      const result = await dispatch(onLanding());
      result.payload.map((item) => {
        item.type === "About" && setPageData(item);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <MainContainer>
        {loading && <Loading />}
        <Title>{pageData.title}</Title>
        <ReactMarkdown>{pageData.text}</ReactMarkdown>
      </MainContainer>
      <Footer />
    </Container>
  );
};
export default connect((state) => {
  return {
    pages: state.pages,
  };
})(About);

const Container = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  margin: auto;
  img {
    max-width: 100%;
  }
`;

const Title = styled.h1``;
