

import { combineReducers } from 'redux';

import collections from './collections';
import counties from './counties';
import sections from './sections';

import timeSlider from './time-slider';
import map from './map';
import filters from './filters';


export default combineReducers({

  collections,
  counties,
  sections,

  timeSlider,
  map,
  filters,

});
