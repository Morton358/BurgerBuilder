import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (data) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json', data)
            .then(response => {
                console.log(response)
                dispatch(purchaseBurgerSuccess(response.data.name, data));
            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseBurgerFail(error))
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

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: err
    };
};

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios
            .get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            })
    }
}
