import React, { useState } from "react";
import styled from "styled-components";
import Badge from "../atoms/Badge";
import { Carousel } from "react-responsive-carousel";
import SoundButton from "../atoms/SoundButton";
const BadgeCarouselContainer = ({
  items,
  handleOnClick,
  showItemName,
  useFilledFrame,
  title,
  emptyShow,
  currentMission,
  missions
}) => {
  const getInitMode = (selected) => {
    let mode = 1;
    console.log(selected)
    missions?.map((item) => {
      console.log(item.id)
      if (selected.currentMission === item.id) {
        if (item.missionType === "Training") {
          mode = 1;
        } else mode = 2;
      }
      return items;
    });
    return mode;
  };
  const [selected, setSelected] = useState(currentMission);
  const [mode, setMode] = useState(getInitMode(selected));
  let showItems = [];
  let trainingItems = [];
  let globalItems = [];

  const slides = [];
  items?.map((item) => {
    if (item?.missionType === "Training") {
      trainingItems.push(item);
    } else {
      globalItems.push(item);
    }
    return items;
  });

  mode === 1 ? (showItems = trainingItems) : (showItems = globalItems);
  let i = 0;
  showItems = showItems.filter((item) => item.id);
  do {
    const slideItems = showItems.slice(i, i + emptyShow ? 5 : 10);
    slides.push(
      <div>
        {Array.from({ length: emptyShow ? 5 : 10 }, (_, index) => {
          return slideItems[index] ? (
            <Container
              key={index}
              style= {slideItems[index].published == false ? {cursor : "default"}: {}}
              onClick={() => {
                if(slideItems[index].published) {
                  handleOnClick(slideItems[index].id);
                  setSelected(slideItems[index].id);
                }
              }}
            >
              <SoundButton>
                <BadgeWrapper>
                  <Badge
                    image={
                      slideItems[index].smallIcon || slideItems[index].image
                    }
                    alt={slideItems[index].name}
                    active={selected === slideItems[index].id && true}
                  />
                </BadgeWrapper>
              </SoundButton>
              {showItemName && (
                slideItems[index].published ? 
              <Title>{slideItems[index].name}</Title> :
              <Title style={{color : "gray"}}>{slideItems[index].name}</Title>)}
            </Container>
          ) : (
            emptyShow && (
              <Container>
                <BadgeWrapper>
                  <Badge empty />
                </BadgeWrapper>
              </Container>
            )
          );
        })}
      </div>
    );
    i += emptyShow ? 5 : 10;
  } while (i < showItems.length);
  if (!showItems) {
    Array.from({ length: 5 }, (_, index) => {
      <Container>
        <Badge empty />
        <Title>Earn More Badges</Title>
      </Container>;
      return 5;
    });
  }

  return (
    <MainContainer>
      <Tabs>
        <Tab empty></Tab>
        <Tab mode={mode === 1 && true} onClick={() => setMode(1)}>
          <SoundButton>Agent Training</SoundButton>
        </Tab>
        <Tab mode={mode === 2 && true} onClick={() => setMode(2)}>
          <SoundButton>Global Missions</SoundButton>
        </Tab>
        <Tab grow empty></Tab>
      </Tabs>
      <BadgeContainer>
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          emulateTouch={true}
          showStatus={false}
          showIndicators={false}
        >
          {slides}
        </Carousel>
      </BadgeContainer>
    </MainContainer>
  );
};

BadgeCarouselContainer.defaultProps = {
  items: [],
  handleOnClick: () => {},
  showItemName: true,
};

export default BadgeCarouselContainer;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid var(--trans-cyan);
  border-radius: var(--border-radius); */
  min-height: 100px;
  width: 100%;
  margin: auto;
  .carousel .slide {
    padding: 0 20px;
    background: transparent;
  }
  .carousel .control-arrow,
  .carousel.carousel-slider .control-arrow {
    opacity: 1;
  }
  .carousel .control-arrow {
    display: block;
    top: 50%;
    height: fit-content;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const BadgeContainer = styled.div`
  border: 1px solid var(--trans-grey);
  border-top: none;
  @media (min-width: 426px) {
    padding: 10px;
  }
  @media (min-width: 769px) {
    padding: 20px;
  }
`;

const Container = styled.button`
  text-align: center;
  width: 20%;
  height: 100%;
  margin: 10px 0;
  padding: 0 1px;
  background-color: transparent;
  border: none;
  /* border: 2px solid red; */
  overflow-wrap: anywhere;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-family: "Orbitron";
  font-size: 6px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  @media (min-width: 426px) {
    font-size: 7px;
  }
  @media (min-width: 769px) {
    margin: 5px;
    font-size: 16px;
  }
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: -1px;
  @media (max-width: 425px) {
    font-size: 8px;
  }
`;

const Tab = styled.div`
  padding: 2px 10px;
  border: 1px solid var(--trans-grey);
  cursor: pointer;
  ${({ mode }) => mode && "border-bottom: none;"}
  ${({ empty }) =>
    empty && "border: none; border-bottom: 1px solid var(--trans-grey);"}
  ${({ mode }) => mode && "color: var(--cyan);"};
  ${({ grow }) => grow && "flex-grow: 1;"}
  @media (min-width: 426px) {
    padding: 12px 24px;
    ${({ empty }) =>
      empty && "border: none; border-bottom: 1px solid var(--trans-grey);"}
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
