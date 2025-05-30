import React, { useState } from "react";
import styled from "styled-components";
import { setCurrentBG } from "../../redux/actions/currentBGAction";
import Button from "../atoms/Button";
import Close from "../../assets/close.svg";
import HugeHeader from "../atoms/HugeHeader";
import DoubleBorderFrame from "./DoubleBorderFrame";

const BackgroundImgSetting = ({ dispatch, backgroundImages, onClose }) => {
  const [selected, setSelected] = useState({
    id: 0,
    url: backgroundImages[0].img,
  });

  const handleClick = (id, url) => {
    setSelected({ id, url });
  };
  const handleSave = () => {
    dispatch(setCurrentBG(selected.url));
  };
  return (
    <DoubleBorderFrame width={"90%"}>
      <ArtHead>
        <HugeHeader>Background</HugeHeader>
        <p>Change your background</p>
      </ArtHead>
      <MainContainer>
        <ClostBtn onClick={onClose}>
          <img src={Close} alt="not found" />
        </ClostBtn>
        {backgroundImages.map((item, key) => (
          <ImgItem
            onClick={() => handleClick(key, item.img)}
            active={key === selected.id}
          >
            <img
              src={item.img}
              alt=""
              width={"100%"}
              height={"100%"}
              key={key}
            />
          </ImgItem>
        ))}
        <Button text="Save" handleOnClick={handleSave} />
      </MainContainer>
    </DoubleBorderFrame>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;

const ImgItem = styled.button`
  width: 100px;
  height: 100px;
  padding: 0;
  ${({ active }) => active && "border: 5px solid white;"}
`;

const ClostBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ArtHead = styled.div`
  p {
    color: var(--cyan);
    font-weight: 600;
    font-size: 20px;
  }
`;
export default BackgroundImgSetting;
