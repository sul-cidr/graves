

import {
  TOGGLE_TIME_SLIDER,
} from '../constants';


/**
 * Toggle the timeline.
 *
 * @param {Boolean} show
 */
export function toggleTimeSlider(show) {
  return {
    type: TOGGLE_TIME_SLIDER,
    show,
  };
}
