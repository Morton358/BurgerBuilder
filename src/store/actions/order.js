import * as actionTypes from './actionsTypes';

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
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
        data: data,
        token: token
    }
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
    return {
        type: actionTypes.FETCH_ORDER_INIT,
        token: token,
        userId: userId
    }
};
