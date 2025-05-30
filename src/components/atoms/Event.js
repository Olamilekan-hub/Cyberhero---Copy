import React, { useEffect } from "react";
import styled from "styled-components";
const Event = ({ bg }) => {
  useEffect(() => {
    const calendarBtn = document.getElementById("subscribe-id");
    calendarBtn?.addEventListener("click", () => {
      console.log("clicked");
      window.open(
        "https://calendar.google.com/calendar/embed?src=dana%40evolutionaryguidancemedia.com&ctz=America%2FChicago",
        "_blank"
      );
    });
  }, [document.getElementById("subscribe-id")]);

  return (
    <CalendarContainer bg={bg}>
      <iframe
        title="dana-calendar"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&showTitle=0&showPrint=0&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%2333B679&color=%230B8043"
        style={{ border: "0" }}
        width="800"
        height="600"
      ></iframe>
    </CalendarContainer>
  );
};

export default Event;

const CalendarContainer = styled.div`
  margin: auto;
  padding: 50px;
  width: 100%;
  background-image: ${({ bg }) => bg && `url(${bg})`};
  background-size: cover;
  border-radius: 40px;
  iframe {
    width: 100%;
  }
  #calendarTitle {
    display: none;
  }
`;
