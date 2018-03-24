import { put } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post(
            '/orders.json?auth=' + action.token,
            action.data
        );
        yield put(
            actions.purchaseBurgerSuccess(response.data.name, action.data)
        );
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrderSaga(action) {
    yield put(actions.fetchOrderStart());
    const queryParams = yield '?auth=' +
        action.token +
        '&orderBy="userId"&equalTo="' +
        action.userId +
        '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = yield [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield fetchedOrders.sort((o1, o2) => {
            return new Date(o2.date) - new Date(o1.date);
        });
        yield put(actions.fetchOrderSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrderFail(error));
    }
}
