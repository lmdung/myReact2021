import {useContext, useState, useEffect} from 'react';
import CartContext from '../../store/cart-context';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {

  const cartCtx = useContext(CartContext);
  const [btnIsHightLight, setBtnIsHightLight] = useState(false);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((total, item) => {
    return total + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnIsHightLight? classes.bump : ''}`;

  useEffect(() => {
    setBtnIsHightLight(true);
    const timer = setTimeout(() => {
      setBtnIsHightLight(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [items])
  return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
  </button>
};

export default HeaderCartButton;