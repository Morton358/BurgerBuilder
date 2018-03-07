import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    };
};
export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (data, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json?auth=' + token, data)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, data));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};

export const fetchOrderSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = err => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: err
    };
};

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams =
            '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios
            .get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            });
    };
};
