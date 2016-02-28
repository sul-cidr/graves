

import TimeSlider from '../../src/components/time-slider';

import { getComponent } from './redux';


/**
 * Set the time slider brush extent.
 *
 * @param {String} start
 * @param {String} end
 */
export function setTimeSliderBrush(start, end) {
  getComponent(TimeSlider).setRange(start, end);
}
