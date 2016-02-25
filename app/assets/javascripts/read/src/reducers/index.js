

import { combineReducers } from 'redux';

import widgets from './widgets';
import collections from './collections';
import counties from './counties';
import sections from './sections';
import baseLayer from './base-layer';
import wmsLayer from './wms-layer';


export default combineReducers({
  widgets,
  collections,
  counties,
  sections,
  baseLayer,
  wmsLayer,
});
