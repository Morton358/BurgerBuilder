import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucced());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDWp-AlI-6luMLmNmLRhEz6Jujxgw2Oesc';
    if (!action.isSignUp) {
        url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDWp-AlI-6luMLmNmLRhEz6Jujxgw2Oesc';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(
            actions.authSuccess(response.data.idToken, response.data.localId)
        );
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    }
}
    