

import {
  SHOW_NARRATIVE,
} from '../constants';


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
