

import fetch from 'isomorphic-fetch';

import {
  REQUEST_COUNTIES,
  RECEIVE_COUNTIES,
  RENDER_COUNTIES,
  HIGHLIGHT_COUNTIES,
  UNHIGHLIGHT_COUNTIES,
  RENDER_CHOROPLETH,
} from '../constants';


/**
 * Load CDC counties.
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
 * When CDC counties are requested.
 */
function requestCounties() {
  return {
    type: REQUEST_COUNTIES,
  };
}


/**
 * When CDC counties are loaded.
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
 * Map ids to Leaflet layers.
 *
 * @param {Object} idMap
 */
export function renderCounties(idMap) {
  return {
    type: RENDER_COUNTIES,
    layers: idMap,
  };
}


/**
 * Highlight an individual county.
 *
 * @param {Number} id
 */
export function highlightCounty(id) {
  return {
    type: HIGHLIGHT_COUNTY,
    id: id,
  };
}


/**
 * Unhighlight counties.
 */
export function unhighlightCounty() {
  return {
    type: UNHIGHLIGHT_COUNTY,
  };
}
