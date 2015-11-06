

import $ from 'jquery';
import fetch from 'isomorphic-fetch';

import {
  REQUEST_NARRATIVE,
  RECEIVE_NARRATIVE,
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

    $.getJSON(`/api/narratives/${slug}.json`, model => {
      dispatch(receiveNarrative(model));
    })

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
