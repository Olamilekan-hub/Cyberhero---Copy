import React, { useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaDownload, FaTrashAlt } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AnimatedButton = ({
  size,
  iconName,
  color,
  startActive,
  disabled,
  useCounter,
  counterValue,
  handleOnClick,
  svg,
}) => {
  const [active, setActive] = useState(startActive || false);
  const [counter, setCounter] = useState(counterValue);

  const getIcon = () => {
    const iconProps = { size, color };

    switch (true) {
      case iconName === "eye" && !!active:
        return <AiFillEye {...iconProps} />;
      case iconName === "eye" && !active:
        return <AiFillEyeInvisible {...iconProps} />;
      case iconName === "heart" && !!active:
        return <FaHeart {...iconProps} />;
      case iconName === "download":
        return <FaDownload {...iconProps} />;
      case iconName === "trash":
        return <FaTrashAlt {...iconProps} />;
      case iconName === "heart" && !active:
      default:
        return <FaRegHeart {...iconProps} />;
    }
  };

  const buttonClick = () => {
    if (useCounter) {
      const newValue = active ? counter - 1 : counter + 1;
      setCounter(newValue);
    }
    setActive(!active);
    handleOnClick();
  };

  return (
    <MainContainer>
      {iconName === "download" ? (
        <DLink
          download="cyberheros-drawing.svg"
          href={svg && `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        >
          {getIcon()}
        </DLink>
      ) : (
        <Button
          type="button"
          disabled={disabled}
          isDisabled={disabled}
          onClick={buttonClick}
        >
          {getIcon()}
          {useCounter && <p>{counter}</p>}
        </Button>
      )}
    </MainContainer>
  );
};

AnimatedButton.defaultProps = {
  size: 32,
  color: "#f9f1f1",
  iconName: "heart",
  startActive: false,
  disabled: false,
  useCounter: false,
  counterValue: 0,
  handleOnClick: () => {},
  svg: null,
};

export default AnimatedButton;

const MainContainer = styled.div`
  svg {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 426px) {
    svg {
      width: 12px;
      height: 12px;
    }
  }
  @media (min-width: 769px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  :hover {
    ${({ isDisabled }) => !isDisabled && `cursor: pointer`}
  }

  p {
    margin: 0 5px;
    color: #f9f1f1;
    font-size: 8px;
    /* border: 1px solid red; */
    @media (min-width: 426px) {
      font-size: 16px;
    }
    @media (min-width: 769px) {
      font-size: 22px;
    }
  }

`;

const DLink = styled.a`
  display: flex;
  align-items: center;
`;
