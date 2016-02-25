

import {
  TOGGLE_MAP_MENU,
  TOGGLE_TIMELINE,
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
export function toggleTimeline(show) {
  return {
    type: TOGGLE_TIMELINE,
    show,
  };
}
