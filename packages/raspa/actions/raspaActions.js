import { createAction } from 'redux-actions';

import {
  LOAD
} from './actionTypes';

export const load = createAction(LOAD, (params) => (params));
