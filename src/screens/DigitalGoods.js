// import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import GoodsAdoptables from "../components/sections/GoodsAdoptables";
import bg from "../assets/bg.jpg";
import GoodsCurrencies from "../components/sections/GoodsCurrencies";
// import Loading from "./Loading";

const DigitalGoods = ({ goods, dispatch }) => {
  //   const [loading, setLoading] = useState(false);

  //   console.log(sorted);
  return (
    <MainContainer>
      {/* {loading && <Loading />} */}
      <PageHeader>DIGITAL GOODS</PageHeader>
      <GoodsAdoptables adoptables={goods.adoptables} />
      <Spacer />
      <GoodsCurrencies currencies={goods.currencies} dispatch={dispatch} />
    </MainContainer>
  );
};

export default connect((state) => {
  return {
    goods: state.goods,
  };
})(DigitalGoods);

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  min-height: calc(100vh - var(--nav-height));
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const PageHeader = styled.h2`
  font-size: 34px;
  color: var(--cyan);
`;

const Spacer = styled.div`
  margin: 20px 0;
`;
