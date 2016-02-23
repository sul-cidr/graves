

import $ from 'jquery';

import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
} from '../constants';


/**
 * Load counties.
 */
export function loadCounties() {
  return dispatch => {

    // Notify start.
    dispatch(requestCounties());

    $.getJSON('/api/counties.json', json => {
      dispatch(receiveCounties(json));
    })

  };
}


/**
 * When counties are requested.
 */
function requestCounties() {
  return {
    type: REQUEST_COUNTIES,
  };
}


/**
 * When counties are loaded.
 *
 * @param {Object} geojson
 */
function receiveCounties(geojson) {
  return {
    type: RECEIVE_COUNTIES,
    geojson,
  };
}
