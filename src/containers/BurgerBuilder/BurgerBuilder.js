import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import FlatButton from 'material-ui/FlatButton';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        openModal: false,
        loading: false,
        errorOccured: false
    };

    componentDidMount() {
        // axios
        //     .get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ errorOccured: true });
        //     });
    }

    updateForSaleState(obj) {
        const sum = Object.values(obj).reduce((acc, el) => {
            return acc + el;
        }, 0);
        return sum > 0;
    }

    handleOpenModal = () => {
        this.setState({ openModal: true });
    };

    handleCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleCheckoutOrder = () => {
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
        let burger = this.state.errorOccured ? (
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
            if (this.state.loading) {
                orderBurger = (
                    <Modal
                        open={this.state.openModal}
                        close={this.handleCloseModal}
                        buttons={null}
                    >
                        <Spinner />
                    </Modal>
                );
            }
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
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName
            }),
        onIngredientRemove: ingName =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName
            }),

        // saveDataForCheckot: () =>
        //     dispatch({
        //         type: actionTypes.SEND_CHECKOUT_DATA,
        //         data: {
        //             ingredients: this.state.ingredients,
        //             totalPrice: this.state.totalPrice
        //         }
        //     })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios)
);
