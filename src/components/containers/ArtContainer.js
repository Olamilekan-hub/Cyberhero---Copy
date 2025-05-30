import React from "react";
import styled from "styled-components";
import AnimatedButton from "../atoms/AnimatedButton";
import { togglePublicArt } from "../../redux/actions/artActions";
import { onArtDeletion, onArtFavorite } from "../../redux/managers/artManager";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const ArtContainer = ({
  art,
  favorited,
  dispatch,
  fromProfile,
  setLoading,
}) => {
  const slides = [];
  const togglePublic = async (_id, isPublic) => {
    try {
      const body = {
        _id,
        isPublic,
      };
      await togglePublicArt(body);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (artID, addFavorite) => {
    try {
      setLoading(true);
      await dispatch(onArtFavorite(artID, addFavorite));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (artID) => {
    try {
      if (window.confirm("Are you sure you want to delete the drawing?")) {
        setLoading(true);
        await dispatch(onArtDeletion(artID));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const determineIsFavorited = (id) => {
    const result = favorited.filter((item) => item === id);
    return result.length > 0;
  };
  for (let i = 0; i < art.length; i += 6) {
    const slideItems = art.slice(i, i + 6);
    const isFavorited = determineIsFavorited(art[i]._id);
    slides.push(
      <SharedContainer>
        {slideItems.map((item, index) => (
          <ArtBox key={i + index}>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                item.content
              )}`}
              alt="userDrawing"
            />
            <ButtonContainer>
              <Row>
                <AnimatedButton
                  iconName="heart"
                  color="red"
                  disabled={fromProfile}
                  startActive={fromProfile ? true : isFavorited}
                  useCounter={true}
                  counterValue={item.favorites}
                  handleOnClick={() => toggleFavorite(item._id, !isFavorited)}
                />
                {fromProfile && (
                  <AnimatedButton
                    iconName="eye"
                    startActive={item.public}
                    handleOnClick={() => togglePublic(item._id, !item.public)}
                  />
                )}
              </Row>
              {fromProfile ? (
                <Row>
                  <AnimatedButton
                    iconName="download"
                    size={26}
                    svg={item.content}
                  />
                  <AnimatedButton
                    iconName="trash"
                    size={26}
                    handleOnClick={() => handleDelete(item._id)}
                  />
                </Row>
              ) : (
                <p>By: {item.username}</p>
              )}
            </ButtonContainer>
          </ArtBox>
        ))}
      </SharedContainer>
    );
  }
  return (
    <MainContainer>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        emulateTouch={true}
        showStatus={false}
        showIndicators={false}
      >
        {slides}
      </Carousel>
    </MainContainer>
  );
};

ArtContainer.defaultProps = {
  art: [],
  fromProfile: false,
};

export default ArtContainer;

const MainContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: thin;
  margin: auto;
  flex-wrap: nowrap;
  max-width: 100%;
  
  @media (min-width: 425px) {
    max-width: 90%;
    width: 100%;
    padding: 25px 0;
  }
  @media (min-width: 1268px) {
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow-x: hidden;
    max-height: 800px;
    overflow-y: auto;
    padding: 0;
  }

  .carousel .slide {
    padding: 0 20px;
    background: transparent;
    @media (min-width: 426px) {
      padding: 0 30px;
    }
  }
  .carousel-root {
    width: 100%;
  }
  .carousel .control-arrow, .carousel.carousel-slider .control-arrow {
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

const SharedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ArtBox = styled.div`
  width: 30%;
  img {
    min-height: 100px;
  }

  @media (min-width: 768px) {
    margin: 5px;
    img {
      width: 100%;
      height: 200px;
    }
  }
  @media (min-width: 1024px) {
    margin: 10px;
    img {
      width: 100%;
      height: 300px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ButtonContainer = styled(Row)`
  justify-content: space-between;
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 425px) {
    font-size: 8px;
  }
`;
