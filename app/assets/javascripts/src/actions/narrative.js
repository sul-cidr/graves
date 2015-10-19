

import fetch from 'isomorphic-fetch';

import {
  REQUEST_NARRATIVE,
  RECEIVE_NARRATIVE,
  SCROLL_SECTION,
} from '../constants';


/**
 * Load collections.
 *
 * @param {String} slug
 */
export function loadNarrative(slug) {
  return dispatch => {

    // Notify start.
    dispatch(requestNarrative());

    fetch(`/api/narratives/${slug}.json`)
    .then(res => res.json())
    .then(model => dispatch(receiveNarrative(model)));

  };
}


/**
 * When a narrative is requested.
 */
function requestNarrative() {
  return {
    type: REQUEST_NARRATIVE,
  };
}


/**
 * When a narrative is loaded.
 *
 * @param {Object} model
 */
function receiveNarrative(model) {
  return {
    type: RECEIVE_NARRATIVE,
    model: model,
  };
}


/**
 * When the narrative scrolls to a section.
 *
 * @param {Boolean} spatial
 */
export function scrollSection(spatial) {
  return {
    type: SCROLL_SECTION,
    spatial: spatial,
  };
}
