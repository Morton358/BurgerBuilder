import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        Tomato: 0,
        Onion: 0,
        Salad: 0,
        Cheese: 0,
        Bacon: 0,
        Meat: 0
    },
    totalPrice: 10
};

const INGREDIENTS_PRICES = {
    Tomato: 2.5,
    Onion: 1.5,
    Salad: 8,
    Cheese: 5,
    Bacon: 7,
    Meat: 10
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1
                },
                totalPrice:
                    state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1
                },
                totalPrice:
                    state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.SEND_CHECKOUT_DATA:
            return {
                ...state,
                ingredients: action.data.ingredients,
                totalPrice: action.data.totalPrice
            };
        default:
            return state;
    }
};

export default reducer;
