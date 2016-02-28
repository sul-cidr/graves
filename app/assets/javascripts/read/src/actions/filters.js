

import {
  SET_TAG_FILTER,
} from '../constants';


/**
 * Filter by tags.
 *
 * @param {Array} tags
 */
export function setTagFilter(tags) {
  return {
    type: SET_TAG_FILTER,
    tags,
  };
}
