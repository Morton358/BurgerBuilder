import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const container = props.forElements.map(ing => {
        return (
            <BuildControl
                key={ing}
                label={ing}
                addClick={() => props.ingredientAdder(ing)}
                removeClick={() => props.ingredientRemover(ing)}
                disableButton={props.disable[ing]}
            />
        )
    })
    return (
        <div className={classes.BuildControls}>
            <p className={classes.Price}>
                <i> Current price: </i>
                <strong>{props.price.toFixed(2)}</strong>
            </p>
            <div className={classes.GridOfBuildControls}>
                {container}
            </div>
            <button
                className={classes.OrderButton}
                disabled={!props.forSale}
                onClick={props.order}
            >
                ORDER NOW
            </button>
        </div>
    );
}
export default buildControls;
