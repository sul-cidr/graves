

import { combineReducers } from 'redux';

import collections from './collections';
import sections from './sections';
import baseLayer from './base-layer';
import wmsLayer from './wms-layer';


export default combineReducers({
  collections,
  sections,
  baseLayer,
  wmsLayer,
});
