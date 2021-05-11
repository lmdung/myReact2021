import react from 'react';

const CartContext = react.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {}
});

export default CartContext;