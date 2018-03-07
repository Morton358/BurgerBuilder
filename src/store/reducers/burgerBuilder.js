import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../share/utility';

const initialState = {
    ingredients: null,
    totalPrice: 10,
    error: false,
    building: false
};

const INGREDIENTS_PRICES = {
    Tomato: 2.5,
    Onion: 1.5,
    Salad: 8,
    Cheese: 5,
    Bacon: 7,
    Meat: 10
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngr = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngrs = updateObject(state.ingredients, updatedIngr);
    const updatedSt = {
        ingredients: updatedIngrs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            Onion: action.ingredients.Onion,
            Salad: action.ingredients.Salad,
            Bacon: action.ingredients.Bacon,
            Tomato: action.ingredients.Tomato,
            Cheese: action.ingredients.Cheese,
            Meat: action.ingredients.Meat
        },
        totalPrice: 10,
        error: false,
        building: false
    });
};

const fetchIngredient = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredient(state, action);
        default:
            return state;
    }
};

export default reducer;
