

import $ from 'jquery';

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


/**
 * Show a CDC choropleth.
 *
 * @param {String} code
 */
export function showChoropleth(code) {
  return {
    type: SHOW_CHOROPLETH,
    code,
  };
}
