

import { combineReducers } from 'redux';
import route from './route';
import narrative from './narrative';
import editor from './editor';
import collections from './collections';
import sections from './sections';
import counties from './counties';


export default combineReducers({
  route,
  narrative,
  editor,
  collections,
  sections,
  counties,
});
