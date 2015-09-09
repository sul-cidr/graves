

import fetch from 'isomorphic-fetch';


export const REQUEST_PROVINCES = 'REQUEST_PROVINCES';
export const RECEIVE_PROVINCES = 'RECEIVE_PROVINCES';


/**
 * When CDC provinces are requested.
 */
export function requestProvinces() {
  return {
    type: REQUEST_PROVINCES,
  };
}


/**
 * When CDC provinces are loaded.
 *
 * @param {Object} json
 */
export function receiveProvinces(json) {
  return {
    type: RECEIVE_PROVINCES,
    provinces: json,
  };
}


/**
 * Load CDC provinces.
 */
export function fetchProvinces() {
  return dispatch => {

    // Notify start.
    dispatch(requestProvinces());

    // Request provinces.
    return fetch('/api/provinces')
      .then(response => response.json())
      .then(json => dispatch(receiveProvinces(json)));

  };
}
