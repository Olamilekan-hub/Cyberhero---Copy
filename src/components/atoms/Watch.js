import React from "react";
import styled from "styled-components";

export default function Watch({ video }) {
  //   console.log(video);
  const url = sanitizeURL(video);
  // console.log(url);
  return (
    <VideoContainer>
      <iframe
        width="100%"
        height="100%"
        src={url}
        frameBorder="0"
        allow="fullscreen"
        title="Wolfin around"
      ></iframe>
    </VideoContainer>
  );
}

const sanitizeURL = (url) => {
  // console.log(url);
  if (url.includes("watch")) return url.replace("watch?v=", "embed/");
  return url;
};

const VideoContainer = styled.div`
  height: 60vh;
  width: 100%;
`;
