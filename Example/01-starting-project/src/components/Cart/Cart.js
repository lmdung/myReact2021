import { useContext, useState, Fragment } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

import CartItem from './CartItem';
import Checkout from './Checkout'

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (checkoutData) => {
    setIsSubmit(true);
    await fetch('https://foodorder-react21-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: checkoutData,
        orderItems: cartCtx.items
      })
    })
    setIsSubmit(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem 
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // onAdd={(event) => cartItemAddHandler(event, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      { hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>)}
    </div>
  )
  const isSubmittingModalContent = <p>Sending order data ...</p>;

  const didSubmitModalContent = <Fragment>
      <p>Successfully sent the order !</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </Fragment>;

  const cartContent = <Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && (
      <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
    )}
    {!isCheckout && modalActions}
  </Fragment>

  return <Modal onClose={props.onClose}>
    {!isSubmit && !didSubmit && cartContent}
    {isSubmit && !didSubmit && isSubmittingModalContent}
    {didSubmit && !isSubmit && didSubmitModalContent}
  </Modal>
};

export default Cart;