import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input'

const MealItemForm = (props) => {
  const inputAmountRef = useRef();
  const [inputAmountValid, setInputValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim() === '' 
      || enteredAmountNumber < 1 
      || enteredAmountNumber > 5) 
    {
      setInputValid(false);
      return;
    }
    props.addAmount(enteredAmountNumber);
  }
  return <form className={classes.form} onSubmit={submitHandler}>
    <Input 
      ref={inputAmountRef}
      label='Amount'
      input={{
        id: 'amount_' + props.id,
        type: 'number',
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 1
      }}
    />
    <button>+ Add</button>
    {!inputAmountValid && <p>Enter number between 1 and 5 !</p>}
  </form>
};

export default MealItemForm;