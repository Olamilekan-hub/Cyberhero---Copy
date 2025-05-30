import { useEffect, useState } from "react";
import styled from "styled-components";
import bg from "../assets/signup.png";
import { useLocation, withRouter } from "react-router-dom";
import { verifyEmailToken } from "../redux/actions/userActions";
import Loading from "./Loading";
import Button from "../components/atoms/Button";

const EmailVerify = ({ dispatch, history }) => {
  let query = useQuery();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async () => {
    try {
      setLoading(true);
      const token = query.get("token");
      const result = await dispatch(verifyEmailToken({ token }));
      // console.log(result);
      if (result.error) throw result.error.message;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return null;
    }
    return (
      <>
        <p>
          {error
            ? "Unable to verify your account"
            : "Account verified successfully!"}
        </p>
        <Button
          text="Return to Login"
          handleOnClick={() => history.push("/login")}
          height="40px"
        />
      </>
    );
  };

  return (
    <MainContainer>
      {loading && <Loading />}
      <InnerContainer>{renderContent()}</InnerContainer>
    </MainContainer>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default withRouter(EmailVerify);

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--nav-height));
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 600px;
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;
