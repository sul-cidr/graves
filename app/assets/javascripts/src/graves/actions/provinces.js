

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
    provinces: json,
  };
}
