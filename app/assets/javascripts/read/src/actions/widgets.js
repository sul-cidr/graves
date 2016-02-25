

import {
  TOGGLE_MAP_MENU,
  TOGGLE_TIME_SLIDER,
} from '../constants';


/**
 * Toggle the map menu.
 *
 * @param {Boolean} show
 */
export function toggleMapMenu(show) {
  return {
    type: TOGGLE_MAP_MENU,
    show,
  };
}


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
