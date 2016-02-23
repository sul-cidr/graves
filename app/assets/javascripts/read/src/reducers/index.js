

import { combineReducers } from 'redux';

import collections from './collections';
import counties from './counties';
import sections from './sections';
import baseLayer from './base-layer';
import wmsLayer from './wms-layer';


export default combineReducers({
  collections,
  counties,
  sections,
  baseLayer,
  wmsLayer,
});
