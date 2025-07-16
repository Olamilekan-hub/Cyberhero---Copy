import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onLanding } from "../redux/managers/pageManager";
import styled from "styled-components";
import Loading from "./Loading";
import DoubleBorderFrame from "../components/containers/DoubleBorderFrame";
import Footer from "../components/containers/Footer";

import bg from "../assets/BG_Short.png";
import Button from "../components/atoms/Button";

import { SEO } from "../components/atoms/SEO";

const Home = ({ dispatch, pages }) => {
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    init();
    pages.pages.forEach((item) => {
      item.type === "Home" && setPageData(item);
    });
  }, []);
  const init = async () => {
    try {
      setLoading(true);
      const result = await dispatch(onLanding());
      result.payload.forEach((item) => {
        item.type === "Home" && setPageData(item);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  function parseText(text) {
    // Find the text wrapped in the Red tag
    const redTagRegex = /<Red>(.*?)<\/Red>/;
    const redTagMatch = text?.match(redTagRegex);
    let parsedText = text;

    if (redTagMatch) {
      const redText = redTagMatch[1];
      // Replace the Red tag with a span with red color
      parsedText = text.replace(redTagRegex, `<span>${redText}</span>`);
    }

    // Wrap the entire text with a div tag
    parsedText = <div dangerouslySetInnerHTML={{ __html: parsedText }}></div>;

    return parsedText;
  }

  return (
    <MainContainer>
      <SEO
        title="Mission: G.A.I.A. - Environmental Heroes Start Here!"
        description="Become an environmental hero! Join thousands of kids learning about climate change and sustainability through interactive missions. Perfect for ages 9-12. Start your eco-adventure today!"
        url="/"
        type="website"
        keywords="environmental education for kids, climate change games, sustainability learning, eco heroes, green education platform"
      />
      {loading && <Loading />}
      {pageData.video && (
        <VideoContainer>
          <video autoPlay loop>
            <source src={pageData.video} />
          </video>
          <Buttons>
            <Link to="/register">
              <Button width={200} height={60} text="Join Now" textSize={30} />
            </Link>
            <Link to="/login">
              <Button width={200} height={60} text="Login" textSize={30} />
            </Link>
          </Buttons>
        </VideoContainer>
      )}
      <BottomContainer>
        <CenterContainer>
          <DoubleBorderFrame width={"90%"} padding={80} center>
            <Title>{pageData.title}</Title>
            <TextWithImage>
              {pageData.image && (
                <Image>
                  <img src={pageData.image} alt="" />
                </Image>
              )}
              <Text>{parseText(pageData?.text)}</Text>
            </TextWithImage>
            <SubTitle>{pageData.subTitle}</SubTitle>
          </DoubleBorderFrame>
        </CenterContainer>
        <Footer />
      </BottomContainer>
    </MainContainer>
  );
};
export default connect((state) => {
  return {
    pages: state.pages,
  };
})(Home);

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomContainer = styled.div`
  width: 100%;
  background-image: url(${bg});
  background-size: 100% 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 40px 0;
  padding: 0 10px;
  @media (min-width: 769px) {
    padding: 0;
  }
`;
const Title = styled.h1`
  color: var(--cyan);
  font-size: 12pt;
  text-align: center;

  @media (min-width: 426px) {
    font-size: 20pt;
  }
  @media (min-width: 769px) {
    font-size: 35pt;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  video {
    width: 100%;
  }
  a {
    text-decoration: none;
  }
`;

const Buttons = styled.div`
  position: absolute;
  top: 40%;
  display: flex;
  gap: 50px;
  @media (min-width: 769px) {
    top: 50%;
  }
`;

const TextWithImage = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;
const Image = styled.div`
  width: 100%;
  padding-right: 16px;
  img {
    width: 100%;
  }
  @media (min-width: 769px) {
    width: 50%;
  }
`;
const Text = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  font-size: 8pt;
  word-wrap: break-word;
  text-align: justify;
  span {
    color: red;
  }
  @media (min-width: 426px) {
    font-size: 12pt;
  }
  @media (min-width: 769px) {
    width:50%;
    font-size: 14pt;
  }
  @media (min-width: 1025px) {
    font-size: 16pt;
  }
`;
const SubTitle = styled.div`
  margin-top: 20px;
  color: var(--cyan);
  font-size: 8pt;
  @media (min-width: 426px) {
    font-size: 12pt;
  }
  @media (min-width: 769px) {
    font-size: 16pt;
  }
`;
