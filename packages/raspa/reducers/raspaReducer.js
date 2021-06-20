import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  LOAD
} from '../actions/actionTypes';

export const initialState = fromJS({
  series: [],
});

export default handleActions({

  [LOAD]: (state, { payload: { params} }) =>
    state.set('series', [])

}, initialState);
