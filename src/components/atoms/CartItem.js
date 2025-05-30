import styled from "styled-components";
import { FaCoins } from "react-icons/fa";
import { TiPlus, TiMinus } from "react-icons/ti";

const CartItem = ({ item }) => {
  return (
    <MainContainer>
      <Section>
        <img src={item.image} alt={item.name} />
        <PaddedP>{item.name}</PaddedP>
      </Section>

      <Section>
        <FaCoins color="yellow" />
        <PaddedP>{item.price}</PaddedP>
      </Section>

      <QuantitySection>
        <button>
          <TiMinus size={20} />
        </button>

        <PaddedP>{item.quantity}</PaddedP>
        <button>
          <TiPlus size={20} />
        </button>
      </QuantitySection>
    </MainContainer>
  );
};

export default CartItem;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px 0;
  /* border: 1px solid red; */
  img {
    height: 80px;
    width: 80px;
  }
`;
const PaddedP = styled.p`
  margin: 0 10px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  /* border: 1px solid white; */
`;

const QuantitySection = styled(Section)`
  width: 150px;
  justify-content: center;
`;
