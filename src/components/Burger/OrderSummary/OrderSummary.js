import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const summaryOrder = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    {igKey}: {this.props.ingredients[igKey]}
                </li>
            );
        });
        return (
            <React.Fragment>
                <h2>Your order:</h2>
                <p>A delicious burger with the following ingredients: </p>
                <ul>{summaryOrder}</ul>
                <h4>Total Price: {this.props.price.toFixed(2)}</h4>
            </React.Fragment>
        );
    }

}

export default OrderSummary;

OrderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired
};
