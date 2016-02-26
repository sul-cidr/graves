

import Radio from 'backbone.radio';

import {
  TIME_SLIDER,
  SET_DATE_RANGE,
  UNSET_DATE_RANGE,
} from '../constants';


const channel = Radio.channel(TIME_SLIDER);


/**
 * Apply a date range.
 *
 * @param {Date} start
 * @param {Date} end
 */
export function setDateRange(start, end) {
  channel.trigger(SET_DATE_RANGE, start, end);
}


/**
 * Clear the date range.
 */
export function unsetDateRange() {
  channel.trigger(UNSET_DATE_RANGE);
}
