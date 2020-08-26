import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import projectsReducer from './projects/reducer';

export const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    projects: projectsReducer,
  });
};
