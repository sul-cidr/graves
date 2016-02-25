

import { combineReducers } from 'redux';

import widgets from './widgets';
import collections from './collections';
import counties from './counties';
import sections from './sections';
import baseLayer from './base-layer';
import wmsLayer from './wms-layer';

import map from './map';
import timeSlider from './time-slider';


export default combineReducers({

  widgets,
  collections,
  counties,
  sections,
  baseLayer,
  wmsLayer,

  map,
  timeSlider,

});
