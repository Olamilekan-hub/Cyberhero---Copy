import React, { useState } from "react";
import styled from "styled-components";
import { addItemsToCart } from "../../redux/managers/cartManager";
import Button from "../atoms/Button";
import CurrencyItem from "../atoms/CurrencyItem";
import DoubleBorderFrame from "../containers/DoubleBorderFrame";

const GoodsCurrencies = ({ currencies, dispatch }) => {
  const [list, setList] = useState([]);

  const handleOnClick = (id) => {
    let newList = list;

    if (newList.includes(id)) {
      newList = newList.filter((e) => e !== id);
    } else {
      newList.push(id);
    }

    setList([...newList]);
  };

  const addSelectedToCart = () => {
    dispatch(addItemsToCart(list));
    setList([]);
  };

  return (
    <MainContainer>
      <DoubleBorderFrame>
        <InnerContainer>
          <Header>[ Mission:Gaia Store ]</Header>
          <SubHeader>Select the gifts for your animal friends!</SubHeader>
          <ProductContainer>
            {currencies.map((currency, index) => {
              return (
                <CurrencyItem
                  handleOnClick={() => handleOnClick(currency.id)}
                  text={currency.name}
                  img={currency.image}
                  active={list.includes(currency.id)}
                  key={index}
                />
              );
            })}
          </ProductContainer>
          <ButtonContainer>
            <Button text="Add to Cart" handleOnClick={addSelectedToCart} />
          </ButtonContainer>
        </InnerContainer>
      </DoubleBorderFrame>
    </MainContainer>
  );
};

export default GoodsCurrencies;

const MainContainer = styled.div`
  width: 80%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  font-size: 36px;
  color: var(--cyan);
  margin: 0;
`;

const SubHeader = styled.p`
  font-size: 18px;
  color: var(--cyan);
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid var(--cyan);
  width: 90%;
  padding: 5%;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
`;
