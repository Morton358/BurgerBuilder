import { takeEvery, fork, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionsTypes';

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';

import { initIngredientsSaga } from './burgerBuilder';

import { purchaseBurgerSaga, fetchOrderSaga } from './order';

const sagas = [watchBurgerBuilder, watchAuth, watchOrder];

export default function* root() {
    yield sagas.map(saga => fork(saga));
}

function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);

}

function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER_INIT, fetchOrderSaga);
}
