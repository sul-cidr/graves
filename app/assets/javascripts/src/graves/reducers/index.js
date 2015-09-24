

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-react-router';
import collections from './collections';


export default combineReducers({
  collections,
  router: routerStateReducer,
});
