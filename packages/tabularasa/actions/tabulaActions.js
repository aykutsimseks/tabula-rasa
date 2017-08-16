import { createAction } from 'redux-actions';

import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './actionTypes';

export const incrementCounter = createAction(INCREMENT_COUNTER, value => ({ value }));

export const decrementCounter = createAction(DECREMENT_COUNTER, value => ({ value }));
