

import fetch from 'isomorphic-fetch';

import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
  SHOW_CHOROPLETH,
} from '../constants';


/**
 * Load counties.
 */
export function loadCounties() {
  return dispatch => {

    // Notify start.
    dispatch(requestCounties());

    fetch('/api/counties')
    .then(res => res.json())
    .then(json => dispatch(receiveCounties(json)));

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
 * @param {Object} json
 */
function receiveCounties(json) {
  return {
    type: RECEIVE_COUNTIES,
    geojson: json,
  };
}


/**
 * Show a CDC choropleth.
 *
 * @param {String} code
 */
export function showChoropleth(code) {
  return {
    type: SHOW_CHOROPLETH,
    code: code,
  };
}
