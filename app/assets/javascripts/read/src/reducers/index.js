

import { combineReducers } from 'redux';

import collections from './collections';
import counties from './counties';
import sections from './sections';

import timeSlider from './time-slider';
import map from './map';


export default combineReducers({

  collections,
  counties,
  sections,

  timeSlider,
  map,

});
