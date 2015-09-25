

import { combineReducers } from 'redux';
import route from './route';
import collections from './collections';
import narrative from './narrative';


export default combineReducers({
  route,
  collections,
  narrative,
});
