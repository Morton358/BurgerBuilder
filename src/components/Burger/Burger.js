import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey] )].map((_, i) => {
            return <BurgerIngredients key={igKey + i} type={igKey} />;
        });
    }).reduce((acum, el) => {
        return acum.concat(el)
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start add ingredients </p>;
    }
    return (
        <div className={classes.Burger} id={classes.styleScroll} >
            <BurgerIngredients type="Bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="Bread-bottom" />
        </div>
    );
};

export default burger;
