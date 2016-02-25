

import {
  TOGGLE_MAP_MENU,
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
