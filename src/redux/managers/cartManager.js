import { setCart } from "../actions/cartActions";

// Expect array of items
const addItemsToCart = (idsArr) => {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    const { currencies } = getState().goods;

    const itemsArr = idLookup(idsArr, currencies);
    const newCartArr = createNewCart(itemsArr, cart);
    dispatch(setCart(newCartArr));
  };
};

// Expect an id string
const removeItemFromCart = (id) => {
  return (dispatch, getState) => {
    const { cart } = getState().cart;

    const newCart = cart.filter((item) => item.id !== id);
    dispatch(setCart(newCart));
  };
};

// CREATE A FUNCTION TO HANDLE SETTING CART = NEW CART AND STORE IN LOCALSTORAGE AT SAME TIME

// Creates and returns an array of objects for each id in the idsArr
// idsArr is array of strings of contentfulID's, goodsArr is the contentful array to lookup against
// As of writing this, only types are (adoptables, currencies)
const idLookup = (idsArr, goodsArr) => {
  let returnArr = [];
  idsArr.forEach((id) => {
    const result = goodsArr.filter((goodsObj) => goodsObj.id === id)[0];
    const resultWithQuantity = {
      ...result,
      quantity: 1,
    };
    returnArr.push(resultWithQuantity);
  });

  return returnArr;
};

// Checks against existing cart for existing items, if any matches increase quantity
const createNewCart = (itemsArr, existingCart) => {
  let newCart = [...existingCart];

  itemsArr.forEach((item) => {
    const foundIndex = newCart.findIndex((cartItem) => cartItem.id === item.id);

    // Super verbose, but it adds one to the found items quantity without errors in redux
    // about mutated state
    if (foundIndex >= 0) {
      let existingItem = newCart[foundIndex];
      const quantity = existingItem.quantity + 1;
      const updatedItem = {
        ...existingItem,
        quantity,
      };

      newCart[foundIndex] = updatedItem;
      return;
    }

    newCart.push(item);
  });

  return newCart;
};

export { addItemsToCart, removeItemFromCart };
