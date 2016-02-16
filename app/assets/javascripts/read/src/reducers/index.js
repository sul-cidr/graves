

import { combineReducers } from 'redux';

import baseLayer from './base-layer';
import collections from './collections';


export default combineReducers({
  baseLayer,
  collections,
});
