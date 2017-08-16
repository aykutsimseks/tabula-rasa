import { handleActions } from 'redux-actions';

import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions';

export const initialState = {};

export default handleActions({

  [USER_LOGIN]: (state, { payload: { user } }) => user,

  [USER_LOGOUT]: () => {},

}, initialState);
