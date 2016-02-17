

import { combineReducers } from 'redux';

import baseLayer from './base-layer';
import collections from './collections';
import wmsLayer from './wms-layer';


export default combineReducers({
  baseLayer,
  collections,
  wmsLayer,
});
