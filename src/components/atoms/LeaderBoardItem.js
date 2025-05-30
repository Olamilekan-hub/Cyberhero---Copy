import React from "react";
import styled from "styled-components";

export default function LeaderBoardItem({ name, xpTotal, itemIndex }) {
  return (
    <ItemContainer color={getColor(itemIndex)} showBorder={itemIndex !== 0}>
      <p>
        NO.{itemIndex + 1} {name}
      </p>
      <p>{xpTotal}xp</p>
    </ItemContainer>
  );
}

LeaderBoardItem.defaultProps = {
  name: "Timmy",
  xpTotal: "550,000",
  itemIndex: 0,
};

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: ${({ showBorder }) =>
    showBorder ? "1px solid grey" : undefined};
  font-weight: bold;
  color: ${({ color }) => color && color};

  p {
    margin: 15px 0 2px 0;
    font-size: 18px;
  }
`;

const getColor = (index) => {
  switch (index) {
    case 0:
      return "red";
    case 1:
      return "yellow";
    case 2:
      return "lightblue";
    default:
      return "white";
  }
};
