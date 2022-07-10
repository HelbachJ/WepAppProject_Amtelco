import React from "react";
import Card from "../UI/Card";
import classes from './AuthForm.module.css';
import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import HomePage from "../../pages/HomePage";

const FetchRandomUser = () => {

    const { isLoading, error, sendRequest: fetchMeals } = useHttp();
    const [meals, setMeals] = useState([]);
  
    useEffect(() => {
      const transformMeals = (mealsObj) => {
        const loadedMeals = [];
  
        for (const mealKey in mealsObj) {
          loadedMeals.push({
            id: mealKey,
            username: mealsObj[mealKey].username,
            password: mealsObj[mealKey].password,
          });
        }
  
        setMeals(loadedMeals);
      };
  
      fetchMeals(
        {
          url:   "https://webapp-appointments-default-rtdb.firebaseio.com/users.json",
        },
        transformMeals
      );
      console.log(fetchMeals);
    }, [fetchMeals]);
  
    if(isLoading) {
      return(
        <section className={classes.mealsLoading}>
        <p>Loading...</p>
        </section>
      );
    }

    if(error) {
        return(
          <section className={classes.mealsError}>
          <p>{error}</p>
          </section>
        );
      }
  
  
    const mealsList = meals.map((meal) => (
      <HomePage
        key={meal.id}
        id={meal.id}
        username={meal.username}
        password={meal.password}
      />
    ));
  
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  };
  
  export default FetchRandomUser;
  