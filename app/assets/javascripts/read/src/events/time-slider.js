

import Radio from 'backbone.radio';

import {
  TIME_SLIDER,
  SET_TIME_SLIDER_RANGE,
} from '../constants';


const channel = Radio.channel(TIME_SLIDER);


/**
 * Set the time slider extent.
 *
 * @param {String} start
 * @param {String} end
 */
export function setTimeSliderRange(start, end) {
  channel.request(SET_TIME_SLIDER_RANGE, start, end);
}
