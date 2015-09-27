

import { combineReducers } from 'redux';
import route from './route';
import collections from './collections';
import narrative from './narrative';
import editor from './editor';


export default combineReducers({
  route,
  collections,
  narrative,
  editor,
});
