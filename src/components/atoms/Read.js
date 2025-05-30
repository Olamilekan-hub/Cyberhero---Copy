import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export default function Read({ text, image, assets }) {
  const getImgURLFromAssetID = (asset_id, assets) => {
    const filteredArr = assets?.filter((asset) => asset?.sys?.id === asset_id);
    return filteredArr?.[0]?.fields?.file?.url;
  };
  return (
    <ReadContainer>
      <img src={getImgURLFromAssetID(image?.sys?.id, assets?.Asset)} alt="" />
      <ReactMarkdown>{text}</ReactMarkdown>
    </ReadContainer>
  );
}

const ReadContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  font-size: 12px;
  letter-spacing: 2px;
  img {
    width: 100%;
    max-width: 600px;
  }
  /* h2 {
    text-align: left;
    align-self: flex-start;
    border: 1px solid black;
  } */
  @media (min-width: 426px) {
    font-size: 18px;
    line-height: 35px;
  }
`;
