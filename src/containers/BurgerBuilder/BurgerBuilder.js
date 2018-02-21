import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import FlatButton from 'material-ui/FlatButton';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

const INGGREDIENTS_PRICES = {
    Tomato: 2.5,
    Onion: 1.5,
    Salad: 8,
    Cheese: 5,
    Bacon: 7,
    Meat: 10
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 10,
        forSale: false,
        openModal: false,
        loading: false,
        errorOccured: false
    };

    componentDidMount() {
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ errorOccured: true });
            });
    }

    updateForSaleState(obj) {
        const sum = Object.values(obj).reduce((acc, el) => {
            return acc + el;
        }, 0);
        this.setState({ forSale: sum > 0 });
    }

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] += 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGGREDIENTS_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updateForSaleState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        if (updatedIngredients[type] <= 0) {
            return;
        }
        updatedIngredients[type] -= 1;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGGREDIENTS_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updateForSaleState(updatedIngredients);
    };

    handleOpenModal = () => {
        this.setState({ openModal: true });
    };

    handleCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleCheckoutOrder = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) +
                    '=' +
                    encodeURIComponent(this.state.ingredients[i])
            );
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        if (this.state.ingredients) {
            const arrIngredients = Object.keys(this.state.ingredients);

            const disabledInfo = { ...this.state.ingredients };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (
                <React.Fragment>
                    <div>
                        <Burger ingredients={this.state.ingredients} />
                    </div>
                    <div>
                        <BuildControls
                            forElements={arrIngredients}
                            ingredientAdder={this.addIngredientHandler}
                            ingredientRemover={this.removeIngredientHandler}
                            disable={disabledInfo}
                            price={this.state.totalPrice}
                            forSale={this.state.forSale}
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
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);
