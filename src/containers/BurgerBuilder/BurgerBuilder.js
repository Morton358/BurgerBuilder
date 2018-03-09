import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import FlatButton from 'material-ui/FlatButton';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        openModal: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updateForSaleState(obj) {
        const sum = Object.values(obj).reduce((acc, el) => {
            return acc + el;
        }, 0);
        return sum > 0;
    }

    handleOpenModal = () => {
        if (this.props.isAuthenticated) {
            this.setState({ openModal: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    };

    handleCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleCheckoutOrder = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const modalButtons = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleCloseModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleCheckoutOrder}
            />
        ];

        let orderBurger = null;
        let burger = this.props.error ? (
            <h2>I can not download ingredients from the server! </h2>
        ) : (
            <Spinner />
        );

        if (this.props.ings) {
            const arrIngredients = Object.keys(this.props.ings);

            const disabledInfo = { ...this.props.ings };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (
                <React.Fragment>
                    <div>
                        <Burger ingredients={this.props.ings} />
                    </div>
                    <div>
                        <BuildControls
                            isAuth={this.props.isAuthenticated}
                            forElements={arrIngredients}
                            ingredientAdder={this.props.onIngredientAdded}
                            ingredientRemover={this.props.onIngredientRemove}
                            disable={disabledInfo}
                            price={this.props.price}
                            forSale={this.updateForSaleState(this.props.ings)}
                            order={this.handleOpenModal}
                        />
                    </div>
                </React.Fragment>
            );
            orderBurger = (
                <Modal
                    open={this.state.openModal}
                    close={this.handleCloseModal}
                    buttons={modalButtons.map(el => el)}
                >
                    <OrderSummary
                        ingredients={this.props.ings}
                        price={this.props.price}
                    />
                </Modal>
            );
        }
        return (
            <React.Fragment>
                {orderBurger}
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: ingName =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path =>
            dispatch(actions.setAuthRedirectPath(path))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios)
);
