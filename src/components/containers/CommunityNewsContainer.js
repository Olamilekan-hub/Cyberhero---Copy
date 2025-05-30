import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Header from "../atoms/Header";
const CommunityNewsContainer = ({ news }) => {
  return (
    <MainContainer>
      <DoubleBorderFrame>
        <Header color="white" font="Bionic" mobileSize={14}>
          News brief
        </Header>
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
          {news.map((item) => {
            return (
              <Slide key={item.id}>
                <ImageContainer imgURL={item.img} />
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <p>{item.title}</p>
                </a>
              </Slide>
            );
          })}
        </Carousel>
      </DoubleBorderFrame>
    </MainContainer>
  );
};

export default CommunityNewsContainer;

const MainContainer = styled.div`
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    margin-top: 20px 0;
    width: calc((100% - 16px) / 2);
  }
  @media (min-width: 1024px) {
    margin: 0;
  }
`;

const Slide = styled.div`
  height: 400px;
  border: 2px solid black;
  p {
    margin-bottom: 50px;
  }
  a {
    color: white;
  }
`;

const ImageContainer = styled.div`
  height: 75%;
  background-image: url(${({ imgURL }) => imgURL});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;
