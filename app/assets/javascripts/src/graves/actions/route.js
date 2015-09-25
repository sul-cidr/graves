

import {
  SHOW_SPLASH,
  SHOW_NARRATIVE,
} from '../constants';


/**
 * Navigate to the splash screen.
 */
export function showSplash() {
  return {
    type: SHOW_SPLASH,
  };
}


/**
 * Navigate to a narrative.
 *
 * @param {String} slug
 */
export function showNarrative(slug) {
  return {
    type: SHOW_NARRATIVE,
    slug: slug,
  };
}
