

import Radio from 'backbone.radio';

import {
  TIME_SLIDER,
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
