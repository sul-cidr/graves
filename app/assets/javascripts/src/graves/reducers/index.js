

import { combineReducers } from 'redux';
import narrative from './narrative';
import collections from './collections';


export default combineReducers({
  narrative,
  collections,
});
