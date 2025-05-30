import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "../atoms/Avatar";
import DoubleBorderFrame from "./DoubleBorderFrame";
import Close from "../../assets/close.svg";
import spiderFrame from "../../assets/profile-spider.png";
const AvatarModal = ({ onClose, onSubmit, startingValue, avatarList }) => {
  const [avatar, setAvatar] = useState();
  const [petId, setPetId] = useState();
  const [petAvatarImg, setPetAvatarImg] = useState();
  const [poseAvatarImg, setPoseAvatarImg] = useState("Pose1");
  const [poseImg, setPoseImg] = useState("");
  const [skinAvatarImg, setSkinAvatarImg] = useState("");
  const [humanImg, setHumanImg] = useState("");
  const skinAvatarList = [];
  const petAvatarList = [];
  const poseAvatarList = [];
  avatarList.map((item, index) => {
    if (index < 4) skinAvatarList.push(item);
    else if (index < 7) petAvatarList.push(item);
    else if (index < 10) poseAvatarList.push(item);
    return avatarList;
  });

  useEffect(() => {
    avatarList.map((item) => {
      let temp = poseAvatarImg + "-" + skinAvatarImg;
      if (!skinAvatarImg) temp = poseAvatarImg + "-NoSkin";
      if (item.title === temp) {
        setHumanImg(item.img);
        setAvatar(item.id);
      }
      return avatarList;
    });
  }, [skinAvatarImg, poseAvatarImg, avatarList]);
  const preSubmit = () => {
    onSubmit(undefined, avatar, petId);
    onClose();
  };
  const ordinate = [
    { x: "40%", y: "5%" },
    { x: "15%", y: "32.5%" },
    { x: "40%", y: "60%" },
  ];
  return (
    <DoubleBorderFrame
      onCancel={onClose}
      onSubmit={preSubmit}
      width={"90%"}
      character
    >
      <ClostBtn onClick={preSubmit}>
        <img src={Close} alt="not found" />
      </ClostBtn>
      <MainContainer>
        <PetContainer>
          {petAvatarList.map((item, index) => (
            <FlexAvatarContainer
              left={ordinate[index].x}
              top={ordinate[index].y}
              onClick={() => {
                setPetAvatarImg(item.img);
                setPetId(item.id);
              }}
              active={item.img === petAvatarImg}
            >
              <Avatar img={item.img} character />
            </FlexAvatarContainer>
          ))}
        </PetContainer>
        <OutcomeContainer>
          <HexContainer>
            <button>
              {humanImg && (
                <HumanImgContainer>
                  <Avatar img={humanImg} human />
                </HumanImgContainer>
              )}{" "}
              {petAvatarImg && (
                <PetAvatarContainer>
                  <Avatar img={petAvatarImg} pet />
                </PetAvatarContainer>
              )}
            </button>
          </HexContainer>
        </OutcomeContainer>
        <PoseContainer>
          {poseAvatarList.map((item, index) => (
            <FlexAvatarContainer
              right={ordinate[index]?.x}
              top={ordinate[index]?.y}
              onClick={() => {
                setPoseImg(item.img);
                setPoseAvatarImg(`Pose${index + 1}`);
              }}
              active={item.img === poseImg}
            >
              <Avatar img={item.img} character />
            </FlexAvatarContainer>
          ))}
        </PoseContainer>
      </MainContainer>
      <SkinContainer>
        {skinAvatarList.map((item, index) => {
          return (
            <AvatarContainer
              bgImg={item.img}
              onClick={() => {
                setSkinAvatarImg(`Skin${index + 1}`);
              }}
              selected={skinAvatarImg === item.title}
              key={index}
            ></AvatarContainer>
          );
        })}
      </SkinContainer>
    </DoubleBorderFrame>
  );
};

export default AvatarModal;

const MainContainer = styled.div`
  margin: auto; 
  display:flex;
`;

const SkinContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const OutcomeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PetContainer = styled.div`
  position: relative;
  min-width: 90px;
  min-height: 300px;
   @media (min-width: 426px) {
    min-width: 120px;
  }
  @media (min-width: 769px) {
    min-width: 150px;
    min-height: 100%;
  }

`;

const PoseContainer = styled.div`
  position: relative;
  min-width: 90px;
  min-height: 300px;
  @media (min-width: 426px) {
    min-width: 120px;
  }
  @media (min-width: 769px) {
    min-width: 150px;
    min-height: 100%;
  }

`;

const AvatarContainer = styled.button`
  width: 60px;
  height: 50px;
  margin: 5px;
  border: ${({ selected }) => (selected ? "1px solid white" : "none")};
  ${({ bgImg }) => bgImg && `background-image: url(${bgImg});`}
  background-size: 100% 100%;
  background-color: transparent;
  :hover {
    cursor: pointer;
  } 
  @media (min-width: 426px) {
      width: 65px;
      height: 55px;
  }
  @media (min-width: 769px) {
      width: 65px;
      height: 55px;
  }
  @media (min-width: 1025px) {
      width: 100px;
      height: 80px;
  }
`;

const HumanImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
  z-index: 2;
`;

const PetAvatarContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: -40px;
  height: 100%;
`;
const FlexAvatarContainer = styled.div`
  position: absolute;
  top: ${({ top }) => top && top};
  left: ${({ left }) => left && left};
  right: ${({ right }) => right && right};
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-color: var(--blue);
  border: 1px solid var(--cyan);
  border-radius: 50%;
  cursor: pointer;
  ${({ active }) => active && `border: 2px solid white;`}
  @media (min-width: 426px) {
      width: 60px;
      height: 60px;
  }
  @media (min-width: 769px) {
      width: 60px;
      height: 60px;
  }
  @media (min-width: 1025px) {
      width: 80px;
      height: 80px;
  }
`;

const ClostBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const HexContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-image: url(${spiderFrame});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  min-height: 120px;
  min-width: 120px;
  max-width: 35%;
  /* border: 1px solid white; */

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    background-color: transparent;
    border-radius: 50%;
    border: none;
  }

  @media (min-width: 426px) {
    min-height: 120px;
    min-width: 120px;

    button {
      width: 130px;
      height: 130px;
    }
  }
  @media (min-width: 576px) {
    min-height: 160px;
    min-width: 160px;
    img {
    }
    button {
    }
  }
  @media (min-width: 768px) {
    min-height: 320px;
    min-width: 320px;

    button {
      width: 200px;
      height: 200px;
    }
  }
  @media (min-width: 1025px) {
    min-height: 370px;
    min-width: 370px;

    button {
      width: 250px;
      height: 250px;
    }
  }
`;
