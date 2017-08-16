import { combineReducers } from 'redux-immutable';

import user from './reducers/userReducer';
import tabularasa from './tabularasa/reducers';

export default combineReducers({ user, tabularasa });
