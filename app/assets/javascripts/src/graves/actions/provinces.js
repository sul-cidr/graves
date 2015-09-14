

import fetch from 'isomorphic-fetch';


export const REQUEST_PROVINCES = 'REQUEST_PROVINCES';
export const RECEIVE_PROVINCES = 'RECEIVE_PROVINCES';
export const HIGHLIGHT_PROVINCE = 'HIGHLIGHT_PROVINCE';


/**
 * Load CDC provinces.
 */
export function loadProvinces() {
  return dispatch => {

    // Notify start.
    dispatch(requestProvinces());

    return fetch('/api/provinces')
      .then(response => response.json())

      // Notify complete.
      .then(json => dispatch(receiveProvinces(json)));

  };
}


/**
 * When CDC provinces are requested.
 */
function requestProvinces() {
  return {
    type: REQUEST_PROVINCES,
  };
}


/**
 * When CDC provinces are loaded.
 *
 * @param {Object} json
 */
function receiveProvinces(json) {
  return {
    type: RECEIVE_PROVINCES,
    provinces: json,
  };
}


/**
 * Load CDC provinces.
 *
 * @param {Number} id
 */
export function highlightProvince(id) {
  return {
    type: HIGHLIGHT_PROVINCE,
    id: id,
  };
}
