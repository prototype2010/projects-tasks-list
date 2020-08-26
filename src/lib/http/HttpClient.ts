import axios from 'axios';
import qs from 'qs';
import AxiosMock from 'axios-mock-adapter';
import { AppMode, EnvVars } from 'lib/env/Env';
import { store } from 'store/store';
import { authHeadersSelector, signOutAction } from 'store/auth/reducer';

const Axios = axios.create({
  baseURL: process.env[EnvVars.API_URL],
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
      arrayFormat: 'brackets',
    }),
});

Axios.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401) {
    store.dispatch(signOutAction());
  }

  return Promise.reject(error);
});

Axios.interceptors.request.use(
  (config) => {
    const { token } = authHeadersSelector(store.getState());

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        ...config.headers,
      },
    };
  },
  (err) => Promise.reject(err),
);

const Router = require('../../mocks').default;
const mock = new AxiosMock(Axios, {
  delayResponse: process.env.REACT_APP_MODE === AppMode.TEST ? 0 : 2000,
});

mock.onAny(/\/mock/).reply((config) => {
  // this will pass to your mocks router, you can put here anything you want
  return Router.proceedRequest(config);
});

if (process.env.REACT_APP_MODE === AppMode.TEST) {
  mock.onAny().reply((config) => Router.proceedRequest(config));
} else {
  mock.onAny().passThrough();
}

export { Axios };
