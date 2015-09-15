

import fetch from 'isomorphic-fetch';
import * as constants from '../constants';


/**
 * Load CDC provinces.
 */
export function loadProvinces() {
  return dispatch => {

    // Notify start.
    dispatch(requestProvinces());

    fetch('/api/provinces')
    .then(res => res.json())
    .then(json => dispatch(receiveProvinces(json)));

  };
}


/**
 * When CDC provinces are requested.
 */
function requestProvinces() {
  return {
    type: constants.REQUEST_PROVINCES,
  };
}


/**
 * When CDC provinces are loaded.
 *
 * @param {Object} json
 */
function receiveProvinces(json) {
  return {
    type: constants.RECEIVE_PROVINCES,
    features: json,
  };
}


/**
 * Highlight an individual province.
 *
 * @param {Number} id
 */
export function highlightProvince(id) {
  return {
    type: constants.HIGHLIGHT_PROVINCE,
    id: id,
  };
}


/**
 * Unhighlight provinces.
 */
export function unhighlightProvince() {
  return {
    type: constants.UNHIGHLIGHT_PROVINCE,
  };
}
