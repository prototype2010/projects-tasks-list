import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './createRootReducer';
import { signOutAction } from './auth/reducer';
import { AppMode, EnvVars } from 'lib/env/Env';

import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const createStore = () => {
  const rootReducer = createRootReducer();

  const reducerState: typeof rootReducer = (state, action) => {
    if (action.type === signOutAction.type) {
      state = undefined;
    }

    return rootReducer(state, action);
  };

  const store = configureStore({
    reducer: reducerState,
    middleware: [sagaMiddleware],
    devTools: true,
    enhancers: [],
  });

  if (process.env[EnvVars.MODE] !== AppMode.PROD) {
    if (module.hot) {
      module.hot.accept('./createRootReducer', () => {
        store.replaceReducer(reducerState);
      });
    }
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
