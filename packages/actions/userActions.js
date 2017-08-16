import { createAction } from 'redux-actions';

import {
  USER_LOGIN,
  USER_LOGOUT,
} from './actionTypes';

export const loginUser = createAction(USER_LOGIN, user => ({ user }));

export const logoutUser = createAction(USER_LOGOUT);
