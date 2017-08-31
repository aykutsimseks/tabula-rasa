import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from '../actions/actionTypes';

export const initialState = fromJS({
  counter: 0,
});

export default handleActions({

  [INCREMENT_COUNTER]: (state, { payload: { value } }) =>
    state.set('counter', state.get('counter') + value),

  [DECREMENT_COUNTER]: (state, { payload: { value } }) =>
    state.set('counter', state.get('counter') - value),

}, initialState);
