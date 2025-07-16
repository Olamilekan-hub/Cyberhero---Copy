import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onLanding } from "../redux/managers/pageManager";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import Footer from "../components/containers/Footer";
import { SEO } from "../components/atoms/SEO";
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
      <SEO
        title="About Mission: G.A.I.A. - Environmental Education Platform"
        description="Learn about Mission: G.A.I.A.'s mission to empower young environmental heroes through interactive education. Discover our approach to teaching climate action and sustainability to kids aged 9-12."
        url="/about"
        type="article"
        keywords="about mission gaia, environmental education mission, climate education platform, sustainability education for kids"
      />
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
