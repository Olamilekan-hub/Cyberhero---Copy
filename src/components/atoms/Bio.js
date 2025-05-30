import React from "react";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";
import Frame from "../../assets/single-border-filled.png";
import SingleBorderFrame from "../containers/SingleBorderFrame";

const Bio = ({ usersBio, handleEdit }) => {
  return (
    <SingleBorderFrame height={"150px"} width={"100%"}>
      <BioContainer>
        <EditContainer onClick={handleEdit}>
          <Edit />
        </EditContainer>
        " {usersBio} "
      </BioContainer>
    </SingleBorderFrame>
  );
};

Bio.defaultProps = {
  usersBio: "Test Bio",
  handleEdit: () => {},
};

export default Bio;

const BioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 120px;
  font-size: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  /* background-image: url(${Frame});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%; */
  @media (min-width: 468px) {
    font-size: 14px;
  }
  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

const EditContainer = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: transparent;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const Edit = styled(FaRegEdit)`
  font-size: 22px;
  color: white;
`;
