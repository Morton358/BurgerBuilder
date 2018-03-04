import React, { Component } from 'react';

import classes from './Order.css';
import detailIconRight from '../../assets/images/ic_keyboard_arrow_right_black_18px.svg';
import detailIconDown from '../../assets/images/ic_keyboard_arrow_down_black_18px.svg';

class Order extends Component {
    state = {
        showDetail: false
    };

    handleDetailClick = prevState => {
        this.setState({ showDetail: !prevState });
    };

    render() {
        const ingredients = [];
        for (let ingredientName in this.props.ingredients) {
            ingredients.push({
                name: ingredientName,
                amount: this.props.ingredients[ingredientName]
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
                    key={ing.name}
                >{`${ing.name}: ${ing.amount}`}</span>
            );
        });

        let orderDetails = (
            <button
                className={classes.Detail}
                onClick={() => this.handleDetailClick(this.state.showDetail)}
            >
                <img src={detailIconRight} alt="Detail" /> <h4>Detail</h4>
            </button>
        );
        if (this.state.showDetail) {
            orderDetails = (
                <React.Fragment>
                    <button
                        className={classes.Detail}
                        onClick={() =>
                            this.handleDetailClick(this.state.showDetail)
                        }
                    >
                        <img src={detailIconDown} alt="Detail" />{' '}
                        <h4>Detail</h4>
                    </button>
                    <p>
                        <strong>Ingredients: </strong> {ingredientsOutput}
                    </p>
                    <p>
                        Price:{' '}
                        <strong>
                            {Number.parseFloat(this.props.price).toFixed(2)} zł.
                        </strong>
                    </p>
                </React.Fragment>
            );
        }
        const curDate = this.props.date.split(' ', 5).join(' ');
        return (
            <div className={classes.Order}>
                <p>
                    <strong>Date of order: </strong>
                    <i style={{ marginLeft: '25px' }}>{curDate}</i>
                </p>
                {orderDetails}
            </div>
        );
    }
}

export default Order;
