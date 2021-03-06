

import {
  SET_TAG_FILTER,
  SET_DATE_FILTER,
  CLEAR_FILTERS,
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


/**
 * Filter by date.
 *
 * @param {Date} start
 * @param {Date} end
 */
export function setDateFilter(start, end) {
  return {
    type: SET_DATE_FILTER,
    start, end,
  };
}


/**
 * Filter by date.
 */
export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}
