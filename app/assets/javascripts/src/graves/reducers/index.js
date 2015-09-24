

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import collections from './collections';


export default combineReducers({
  collections,
  router: routerStateReducer,
});
