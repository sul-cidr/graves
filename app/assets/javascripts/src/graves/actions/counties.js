

import fetch from 'isomorphic-fetch';
import * as constants from '../constants';


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
    type: constants.REQUEST_COUNTIES,
  };
}


/**
 * When CDC counties are loaded.
 *
 * @param {Object} json
 */
function receiveCounties(json) {
  return {
    type: constants.RECEIVE_COUNTIES,
    geojson: json,
  };
}


/**
 * Highlight an individual county.
 *
 * @param {Number} id
 */
export function highlightCounty(id) {
  return {
    type: constants.HIGHLIGHT_COUNTY,
    id: id,
  };
}


/**
 * Unhighlight counties.
 */
export function unhighlightCounty() {
  return {
    type: constants.UNHIGHLIGHT_COUNTY,
  };
}


/**
 * Map ids to Leaflet layers.
 *
 * @param {Object} idMap
 */
export function renderCounties(idMap) {
  return {
    type: constants.RENDER_COUNTIES,
    layers: idMap,
  };
}
