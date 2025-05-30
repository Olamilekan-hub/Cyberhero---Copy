import React from "react";
import CartItem from "../atoms/CartItem";
import ModalContainer from "./ModalContainer";

const CartModal = ({ cart, onCancel }) => {
  return (
    <ModalContainer onCancel={onCancel}>
      {cart.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </ModalContainer>
  );
};

export default CartModal;
