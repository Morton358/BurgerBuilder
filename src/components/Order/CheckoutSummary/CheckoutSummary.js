import React from 'react';
import Burger from '../../Burger/Burger.js';
import FlatButton from 'material-ui/FlatButton';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <FlatButton
            label="Cancel"
            secondary={true}
            onClick={props.checkoutCancelled}
        />
        <FlatButton
            label="Submit"
            primary={true}
            onClick={props.checkoutContinued}
        />
    </div>
);

export default checkoutSummary;
