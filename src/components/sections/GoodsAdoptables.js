import { useState } from "react";
import styled from "styled-components";
import { useParams, withRouter } from "react-router-dom";
import DoubleBorderFrame from "../containers/DoubleBorderFrame";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import SingleBorderFrame from "../containers/SingleBorderFrame";
import BadgeCarouselContainer from "../containers/BadgeCarouselContainer";
import Button from "../atoms/Button";
import AdoptableAnimation from "../atoms/AdoptableAnimation";

const GoodsAdoptables = ({ adoptables }) => {
  let { adoptableID } = useParams();
  const [selectedID, setSelectedID] = useState(
    adoptableID || adoptables?.[0]?.id
  );

  const selectedAdoptable = adoptables.filter(
    (item) => item.id === selectedID
  )[0];

  const changeAdoptable = (next) => {
    const adoptablesArr = adoptables;
    const index = adoptablesArr.findIndex((item) => item.id === selectedID);
    let newIndex;
    if (!!next) {
      newIndex = index + 1;
      if (newIndex > adoptablesArr.length - 1) newIndex = 0;
    } else {
      newIndex = index - 1;
      if (newIndex < 0) newIndex = adoptablesArr.length - 1;
    }
    setSelectedID(adoptablesArr[newIndex].id);
  };

  return (
    <MainContainer>
      <DoubleBorderFrame useMissionFrame>
        <HeaderContainer>
          <Row>
            <IconButton onClick={() => changeAdoptable(false)}>
              <FaChevronLeft />
            </IconButton>
            <h2>[ {selectedAdoptable.name} ]</h2>
            <IconButton onClick={() => changeAdoptable(true)}>
              <FaChevronRight />
            </IconButton>
          </Row>

          <p>Donate for your animal friends and earn XP!</p>
        </HeaderContainer>
        <ContainerFlex>
          <SideContainers>
            <SingleBorderFrame>
              <SideHeader>
                <h3>Thank You!</h3>
                <SideContainerText>
                  Hi, I am {selectedAdoptable.name}, I am your new friend! Keep
                  coming back!
                </SideContainerText>
              </SideHeader>
              <Button text="Adopt More" />
            </SingleBorderFrame>
          </SideContainers>
          <AdoptableAnimation url={selectedAdoptable.animation} />
          <SideContainers>
            <SingleBorderFrame>
              <SideHeader>
                <h3>Wish List</h3>
                <SideContainerText>
                  What types of gifts do you think I would like?
                </SideContainerText>
              </SideHeader>
            </SingleBorderFrame>
          </SideContainers>
        </ContainerFlex>
        <div>
          <BadgeCarouselContainer
            title="Available for Adopting"
            items={adoptables}
            handleOnClick={setSelectedID}
          />
        </div>
      </DoubleBorderFrame>
    </MainContainer>
  );
};

export default withRouter(GoodsAdoptables);

const MainContainer = styled.div`
  width: 80%;
`;

const HeaderContainer = styled.div`
  text-align: center;

  h2 {
    color: var(--cyan);
    font-size: 30px;
  }
  p {
    color: var(--cyan);
    font-weight: bold;
  }
  span {
    color: white;
  }

  @media (min-width: 768px) {
    h2 {
      width: 375px;
    }
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const IconButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 22px;

  :hover {
    cursor: pointer;
  }
`;
const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
  @media (min-width: 1268px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;
const SideContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: center;
  max-width: 360px;

  @media (min-width: 1268px) {
    margin: 0 20px;
    min-height: 440px;
  }
`;

const SideHeader = styled.div`
  padding: 0 30px;
`;

const SideContainerText = styled.p`
  color: var(--cyan);
  font-weight: bold;
`;
