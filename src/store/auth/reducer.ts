import { createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { merge } from 'lodash';

import { asyncAction, syncAction } from 'lib/actions';
import { RootState } from 'store/store';
import { getAuthDataFromStorage } from 'store/auth/helpers';

const staticInitialState = {
  singUpSuccessful: false,
  meta: {
    isAuthorized: false,
    isLoading: false,
    isError: false,
    errorMsg: [],
  },
  headers: {
    token: '',
  },
};

export const initialState = {
  get auth() {
    const { token } = getAuthDataFromStorage();

    return merge(staticInitialState, {
      meta: {
        isAuthorized: Boolean(token),
      },
      headers: {
        token,
      },
    });
  },
};

export const signInAction = asyncAction('auth/SIGN_IN');
export const signOutAction = syncAction('auth/SIGN_OUT');
export const signUpAction = asyncAction('auth/SIGN_UP');

export const resetErrorAction = syncAction('auth/RESET_ERROR');
export const closeSnack = syncAction('auth/CLOSE_SNACK');

export const authReducer = createReducer(initialState.auth, {
  ////////////////////////////////////////////////////////////////////////////////////
  [signInAction.request]: (draft, { payload }) => {
    draft.meta.isLoading = true;
    draft.meta.isAuthorized = false;

    draft.meta.isError = staticInitialState.meta.isError;
    draft.meta.errorMsg = staticInitialState.meta.errorMsg;

    draft.singUpSuccessful = false;
  },
  [signInAction.success]: (draft, { payload }) => {
    draft.headers.token = payload;
    draft.meta.isLoading = false;
    draft.meta.isAuthorized = true;
    draft.singUpSuccessful = true;
  },
  [signInAction.failure]: (draft, { payload }) => {
    draft.meta.isLoading = false;
    draft.meta.isAuthorized = false;

    draft.meta.isError = true;
    draft.meta.errorMsg = payload.errors;
  },
  [closeSnack.type]: (draft) => {
    draft.singUpSuccessful = false;
  },
  ////////////////////////////////////////////////////////////////////////////////////  ////////////////////////////////////////////////////////////////////////////////////
  [signUpAction.request]: (draft, { payload }) => {
    draft.meta.isLoading = true;
    draft.meta.isError = staticInitialState.meta.isError;
    draft.meta.errorMsg = staticInitialState.meta.errorMsg;
  },
  [signUpAction.success]: (draft, { payload }) => {
    draft.meta.isLoading = false;
    draft.singUpSuccessful = true;
  },
  [signUpAction.failure]: (draft, { payload }) => {
    draft.meta.isLoading = false;
    draft.meta.errorMsg = payload.errors || [];
    draft.meta.isError = true;
  },
  ////////////////////////////////////////////////////////////////////////////////////
  [signOutAction.type]: (draft, { payload }) => {
    draft.headers.token = '';
    draft.meta.isAuthorized = false;
  },
  ////////////////////////////////////////////////////////////////////////////////
  [resetErrorAction.type]: (draft) => {
    draft.meta.isError = staticInitialState.meta.isError;
    draft.meta.errorMsg = staticInitialState.meta.errorMsg;
  },
  ////////////////////////////////////////////////////////////////////////////////////
});

const authSelector = (state: RootState) => state.auth;
export const authHeadersSelector = createSelector(authSelector, (auth) => auth.headers);
export const authIsAuthorizedSelector = createSelector(authSelector, (auth) => auth.meta.isAuthorized);
export const authMetaSelector = createSelector(authSelector, (auth) => auth.meta);
export const signUpSuccessfulSelector = createSelector(authSelector, (auth) => auth.singUpSuccessful);

export default authReducer;
