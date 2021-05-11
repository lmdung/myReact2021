import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // concat return new array, push return old array
    // const updateItems = state.items.concat(action.item); 
    const updateTotalAmount = state.totalAmount + action.item.amount * action.item.price;
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];
    let updateItems;

    if (existingItem) {
      let updateItem;
      updateItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      };
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount
    }
  }
  if (action.type === 'REMOVE') {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updateTotalAmount = state.totalAmount - existingItem.price;
    let updateItems;
    if (existingItem.amount === 1) {
      updateItems = state.items.filter(item => item.id !== existingItem.id);
    } else {
      let updateItem;
      updateItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      }
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount
    }

  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };
  const clearItems = () => {
    dispatchCartAction({type: 'CLEAR'})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItems: clearItems
  }
  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;