import React from 'react';
import classes from './Order.css';

const order = props => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map((ing, index) => {
        return (
            <span
                style={{
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ing.name}>{`${ing.name}: ${ing.amount}`}</span>
        );
    });
    return (
        <div className={classes.Order}>
            <p><strong>Ingredients: </strong> {ingredientsOutput}</p>
            <p>
                Price:{' '}
                <strong>{Number.parseFloat(props.price).toFixed(2)} zł.</strong>
            </p>
        </div>
    );
};

export default order;
