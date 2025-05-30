import React from "react";
import styled from "styled-components";
import SingleBorderFrame from "../containers/SingleBorderFrame";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { useState } from "react";

export default function CrestsBoard({ crests }) {
  const [crestsList, setCrestsList] = useState([]);
  useEffect(() => {
    const temp = [];
    crests.map((item, key) => {
      temp.push(
        <Image key={key}>
          <img src={item} key={key} alt="" />
        </Image>
      );
      return crests;
    });
    setCrestsList(temp);
  }, [crests]);
  return (
    <Container>
      <h3>Crests</h3>
      <SingleBorderFrame width="100%" height={"150px"} crestBoard>
        {
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            emulateTouch={true}
            showStatus={false}
            showIndicators={false}
          >
            {crestsList}
          </Carousel>
        }
      </SingleBorderFrame>
    </Container>
  );
}

const Container = styled.div`
  h3 {
    height: 30px;
    font-size: 10px;
  }
  .carousel .slide {
    height: 40px;
    div {
      height: 100%;
    }
  }
  .carousel .slide {
    background-color: transparent;
  }
  .carousel .slide img {
    max-width: 100%;
    width: auto;
    height: 100%;
  }
  .carousel .control-arrow {
    padding: 0;
  }
  @media (min-width: 426px) {
    h3 {
      font-size: 1.17em;
    }
    .carousel .slide {
      height: 80px;
    }
  }
  @media (min-width: 769px) {
    h3 {
      font-size: 1.17em;
    }
    .carousel .slide {
      height: 150px;
    }
  }
  @media (max-width: 520px) {
    .carousel .control-arrow:before {
      margin: 0;
    }
  }
`;
const Image = styled.div``;
