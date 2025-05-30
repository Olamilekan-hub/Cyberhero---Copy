import React, { useState } from "react";
import styled from "styled-components";
import { useSvgDrawing } from "react-hooks-svgdrawing";
import { createColors } from "../../constants/constants";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
import { GiPaintBrush, GiPaintBucket } from "react-icons/gi";
import { TiPlus, TiMinus } from "react-icons/ti";
import { onArtCompletion } from "../../redux/managers/artManager";
import Loading from "../../screens/Loading";
import Button from "./Button";

import Stamp1 from "../../assets/animals/butterfly.webp";
import Stamp2 from "../../assets/animals/dolphin.webp";
import Stamp3 from "../../assets/animals/elephant.webp";
import Stamp4 from "../../assets/animals/hippopotamus.webp";
import Stamp5 from "../../assets/animals/panda.webp";
import Stamp6 from "../../assets/animals/turtle.webp";

const Create = ({ dispatch, onComplete, isNotification }) => {
  const [penSize, setPenSize] = useState(10);
  const [penColor, setPenColor] = useState("black");
  const [bgColor, setBGColor] = useState("white");
  const [loading, setLoading] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [stamps, setStamps] = useState([]);
  const [renderRef, draw] = useSvgDrawing({
    penWidth: penSize, // pen width
    penColor: penColor, // pen color
    delay: 0, // Set how many ms to draw points every.
  });
  // console.log(draw);
  const changeSize = (value) => {
    console.log(value);
    if (value > 40 || value < 1) return;
    setPenSize(value);
    draw.changePenWidth(value);
  };
  const changeColor = (color) => {
    setPenColor(color);
    draw.changePenColor(color);
  };
  const changeBGColor = () => {
    setBGColor(penColor);
  };
  const deleteDrawing = () => {
    if (window.confirm("Are you sure you want to delete the drawing?")) {
      draw.clear();
      setStamps([]);
      setBGColor("white");
    }
  };
  const saveDrawing = async (share) => {
    try {
      let timer;
      setLoading(true);
      const preCleanupSVG = draw.getSvgXML();
      const svg = makeSVG(preCleanupSVG);
      await dispatch(onArtCompletion(svg, share));
      share !== null && share
        ? isNotification("share")
        : isNotification("save");
      setTimeout(() => (timer = onComplete()), 1000);
      clearTimeout(timer);
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  };

  const makeSVG = (svg) => {
    // console.log(svg);
    const result =
      svg.slice(0, 5) +
      `xmlns="http://www.w3.org/2000/svg" style="background-color:${bgColor}" ` +
      svg.slice(5);

    return result;
  };
  const handleCanvasClick = (e) => {
    if (selectedStamp) {
      const canvasRect = e.target.getBoundingClientRect();
      const canvasX = canvasRect.left;
      const canvasY = canvasRect.top;
      const x = e.clientX - canvasX;
      const y = e.clientY - canvasY;

      // Check if the click occurred on an existing stamp
      const isClickOnExistingStamp = stamps.some((stamp) => {
        const stampX = stamp.x;
        const stampY = stamp.y;
        const stampWidth = 100;
        const stampHeight = 100;

        if (
          x >= stampX &&
          x <= stampX + stampWidth &&
          y >= stampY &&
          y <= stampY + stampHeight
        ) {
          return true;
        }
        return false;
      });

      if (!isClickOnExistingStamp) {
        // Calculate the center position for the stamp relative to the canvas
        const stampWidth = 100;
        const stampHeight = 100;
        const centerX = x - stampWidth / 2;
        const centerY = y - stampHeight / 2;

        // Create a copy of the existing stamps array and add the new stamp object with the center position
        const updatedStamps = [
          ...stamps,
          { type: selectedStamp, x: centerX, y: centerY },
        ];
        setStamps(updatedStamps);
      }
    }
  };

  return (
    <MainContainer>
      {loading && <Loading />}
      <InnerContainer>
        <InputsContainer>
          <PenOptionsContainer>
            <ColorsContainer>
              {createColors.map((color, index) => (
                <ColorButton
                  key={index}
                  color={color}
                  active={penColor === color}
                  onClick={() => changeColor(color)}
                />
              ))}
            </ColorsContainer>
            <PenSizeContainer>
              <GiPaintBrush size={24} />
              <PenSizeSample penSize={penSize} color={penColor}>
                <div />
              </PenSizeSample>
              <p>{penSize}</p>
              <button>
                <TiPlus size={28} onClick={() => changeSize(penSize + 1)} />
              </button>
              <button>
                <TiMinus size={28} onClick={() => changeSize(penSize - 1)} />
              </button>
            </PenSizeContainer>
          </PenOptionsContainer>

          <IconsContainer>
            <IconButtons onClick={changeBGColor}>
              <GiPaintBucket size={24} />
            </IconButtons>
            <IconButtons onClick={draw.undo}>
              <FaUndo />
            </IconButtons>
            <IconButtons onClick={deleteDrawing}>
              <FaTrashAlt color="#DE1738" />
            </IconButtons>
            {/* Add buttons for stamps */}
            <IconButtons
              onClick={() => setSelectedStamp(Stamp1)}
              style={
                selectedStamp === Stamp1 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp1} alt="Stamp 1" width="24" />
            </IconButtons>
            <IconButtons
              onClick={() => setSelectedStamp(Stamp2)}
              style={
                selectedStamp === Stamp2 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp2} alt="Stamp 2" width="24" />
            </IconButtons>
            <IconButtons
              onClick={() => setSelectedStamp(Stamp3)}
              style={
                selectedStamp === Stamp3 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp3} alt="Stamp 1" width="24" />
            </IconButtons>
            <IconButtons
              onClick={() => setSelectedStamp(Stamp4)}
              style={
                selectedStamp === Stamp4 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp4} alt="Stamp 2" width="24" />
            </IconButtons>
            <IconButtons
              onClick={() => setSelectedStamp(Stamp5)}
              style={
                selectedStamp === Stamp5 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp5} alt="Stamp 1" width="24" />
            </IconButtons>
            <IconButtons
              onClick={() => setSelectedStamp(Stamp6)}
              style={
                selectedStamp === Stamp6 ? { outline: "2px solid white" } : {}
              }
            >
              <img src={Stamp6} alt="Stamp 2" width="24" />
            </IconButtons>
            {/* Add buttons for additional stamps as needed */}
          </IconsContainer>
        </InputsContainer>

        <CanvasContainer>
          {stamps &&
            stamps.map((stamp, index) => (
              <StampContainer
                key={index}
                style={{ position: "absolute", left: stamp.x, top: stamp.y }}
              >
                {stamp.type && (
                  <img
                    src={stamp.type}
                    style={{
                      width: "100px",
                      height: "100px",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                    alt=""
                  />
                )}{" "}
                {/* Render the selected stamp type */}
              </StampContainer>
            ))}{" "}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: bgColor,
            }}
            ref={renderRef}
            onClick={handleCanvasClick}
          />
        </CanvasContainer>
      </InnerContainer>
      <ButtonContainer>
        <Button text="Save" handleOnClick={() => saveDrawing(false)} />
        <Button text="Share" handleOnClick={() => saveDrawing(true)} />
      </ButtonContainer>
    </MainContainer>
  );
};

export default Create;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--cyan);
  margin-bottom: 5px;
  @media (min-width: 768px) {
    flex-direction: column;
    margin-right: 5px;
    margin-bottom: 0;
  }
`;

const StampContainer = styled.div`
  position: absolute;
  display: inline-block;
`;

const PenOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;
const ColorButton = styled.button`
  background: ${({ color }) => color && `${color}`};
  border: ${({ active }) => (active ? "2px solid white" : "none")};
  margin: 5px;
  height: 25px;
  width: 25px;
  :hover {
    cursor: pointer;
    border: ${({ active }) => (active ? "2px solid white" : "2px solid grey")};
  }
`;
const PenSizeContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    width: 30px;
    text-align: center;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
  button {
    background-color: transparent;
    color: white;
    border: none;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;
const PenSizeSample = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  div {
    border-radius: 50%;
    width: ${({ penSize }) => (penSize ? `${penSize}px` : "10px")};
    height: ${({ penSize }) => (penSize ? `${penSize}px` : "10px")};
    background-color: ${({ color }) => (color ? color : "black")};
  }
`;
const CanvasContainer = styled.div`
  position: relative;
  margin: auto 0;
  height: 75vh;
  /* height: 30vh; */
  width: 100%;
  min-width: 250px;
  /* min-height: 400px; */
  overflow: hidden;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const IconButtons = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  padding: 5px 10px;
  margin: 5px;
  :hover {
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-self: center;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;
