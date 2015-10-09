

import {
  SHOW_SPLASH,
  SHOW_NARRATIVE,
  SHOW_EXPLORE,
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


/**
 * Navigate to the "explorer."
 */
export function showExplore() {
  return {
    type: SHOW_EXPLORE,
  };
}
