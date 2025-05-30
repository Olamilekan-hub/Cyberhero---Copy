import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onLogin } from "../redux/managers/dataManager";
import Loading from "./Loading";
import styled from "styled-components";
import LeaderBoardContainer from "../components/containers/LeaderBoardContainer";
import CommunityNewsContainer from "../components/containers/CommunityNewsContainer";
import SelectAMission from "../components/containers/SelectAMission";
import DoubleBorderFrame from "../components/containers/DoubleBorderFrame";
import ArtContainer from "../components/containers/ArtContainer";
import Header from "../components/atoms/Header";
import { setCurrentBG } from "../redux/actions/currentBGAction";

const HQ = ({
  dispatch,
  missions,
  news,
  progress,
  art,
  achievements,
  user,
  currentMission,
  currentBG,
  backgroundImages,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(backgroundImages.backgroundImages);
    !currentBG.currentBG &&
      dispatch(
        setCurrentBG(
          backgroundImages?.backgroundImages?.["Background Images"]?.[0]?.img
        )
      );
  }, [backgroundImages]);

  const init = async () => {
    try {
      setLoading(true);
      await dispatch(onLogin());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <Location>HQ</Location>
      {loading && <Loading />}
      <InnerContainer>
        <Row>
          {!!achievements.achievement && (
            <LeaderBoardContainerStyled leaderBoard={achievements.achievement} />
          )}
          <CommunityNewsContainerStyled news={news.news} />
        </Row>
        {missions.missions.length > 0 && progress && (
          <PaddingContainer>
            <SelectAMission
              missions={missions.missions}
              progress={progress.progress}
              currentMission={currentMission?.currentMission}
              dispatch={dispatch}
            />
          </PaddingContainer>
        )}
        <DoubleBorderFrame>
          <Header color="white" font="Bionic" mobileSize={14}>
            Community Sharing
          </Header>
          <ArtContainer
            art={art.communityArt}
            favorited={art.favoriteArt}
            dispatch={dispatch}
            setLoading={setLoading}
          />
        </DoubleBorderFrame>
      </InnerContainer>
    </MainContainer>
  );
};

export default connect((state) => {
  return {
    missions: state.missions,
    progress: state.progress,
    news: state.news,
    user: state.user,
    leaderboard: state.leaderboard,
    art: state.art,
    achievements: state.achievements,
    avatars: state.avatars,
    currentMission: state.currentMission,
    currentBG: state.currentBG,
    backgroundImages: state.backgroundImages,
  };
})(HQ);

// Styled components

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  min-height: calc(100vh - var(--nav-height));
  background-size: cover;
`;

const InnerContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch; /* Stretch children to equal height */
  gap: 8px;

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  @media (min-width: 425px) {
    gap: 16px;
  }
`;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  @media (min-width: 425px) {
    margin: 4vmin 0;
  }
`;

const Location = styled.div`
  margin: 0 0 8px 0;
  width: calc(100% - 32px);
  color: var(--light-cyan);
  text-align: left;
  @media (min-width: 425px) {
    margin: 0 0 20px 0;
  }
`;

const LeaderBoardContainerStyled = styled(LeaderBoardContainer)`
  flex: 1; /* Makes LeaderBoardContainer take equal height */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const CommunityNewsContainerStyled = styled(CommunityNewsContainer)`
  flex: 1; /* Makes CommunityNewsContainer take equal height */
`;
