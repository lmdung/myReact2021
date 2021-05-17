import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHTTPError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch('https://foodorder-react21-default-rtdb.firebaseio.com/meals.json');
      if (!res.ok) {
        throw new Error('Something went wrong !')
      }
      const resData = await res.json();
      const loadMeals = [];
      for (let key in resData) {
        loadMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        })
      }
      setMeals(loadMeals);
      setIsLoading(false);
    }
    // not use: try {fetchMeals ()} catch () because fetchMeal is async fn > return a promise, catch error in promise will reject promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHTTPError(error.message)
    });
   }, []);

  if (isLoading) {
    return <section className={classes.isLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.error}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map(meal => (
    <MealItem 
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    />
  ))
  return <section className={classes.meals}>
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  </section>
};

export default AvailableMeals;