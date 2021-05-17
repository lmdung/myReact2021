import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  })
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const nameInputValid = !isEmpty(enteredName);
    const streetInputValid = !isEmpty(enteredStreet);
    const postalInputValid = isFiveChars(enteredPostal);
    const cityInputValid = !isEmpty(enteredCity);
    
    setFormValid({
      name: nameInputValid,
      street: streetInputValid,
      postal: postalInputValid,
      city: cityInputValid
    })
    const formIsValid = 
      nameInputValid 
      && streetInputValid 
      && postalInputValid 
      && cityInputValid
    if (!formIsValid) {
      return
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    })
  };

  const nameInputClasses = `${classes.control} ${formValid.name ? '' : classes.invalid}`;
  const streetInputClasses = `${classes.control} ${formValid.street ? '' : classes.invalid}`;
  const postalInputClasses = `${classes.control} ${formValid.postal ? '' : classes.invalid}`;
  const cityInputClasses = `${classes.control} ${formValid.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formValid.name && <p>please enter your name !</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formValid.street && <p>please enter your street !</p>}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formValid.postal && <p>please enter your postal (5 characters)!</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValid.city && <p>please enter your city !</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
