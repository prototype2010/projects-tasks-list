import { AnyAction } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { signInAction, signOutAction, signUpAction } from 'store/auth/reducer';
import { removeAuthToken, saveAuthTokenInStorage } from 'store/auth/helpers';
import { Axios } from '../../lib/http/HttpClient';

export const serializeErrors = (errorObject: AxiosError) => {
  if (errorObject?.response?.data) {
    const { error, message } = errorObject?.response?.data;

    const messages = Array.isArray(message) ? message : [message];

    return { errors: [error, ...messages] };
  } else if (!errorObject.response) {
    console.error(errorObject);

    return { errors: ['Server unreachable'] };
  } else {
    return { errors: ['Unknown error'] };
  }
};

function* login({ payload }: AnyAction) {
  try {
    const { email, password } = payload;
    const response = yield call(() => Axios.post('/auth/signin', { email, password }));
    const token = response.data.token;

    saveAuthTokenInStorage(token);

    yield put({
      type: signInAction.success,
      payload: token,
    });
  } catch (e) {
    const errors = serializeErrors(e);

    yield put({
      type: signInAction.failure,
      payload: errors,
    });
  }
}

function* signUp({ payload }: AnyAction) {
  try {
    const { email, password, repeatPassword } = payload;
    yield call(() => Axios.post('/auth/signup', { email, password, repeatPassword }));

    yield put({
      type: signUpAction.success,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: signUpAction.failure,
      payload: errors,
    });
  }
}

function* logout() {
  try {
    yield removeAuthToken();
  } catch (e) {
    console.error(e);
  }
}

export default function* () {
  yield takeEvery(signUpAction.request, signUp);
  yield takeEvery(signInAction.request, login);
  yield takeEvery(signOutAction.type, logout);
}
