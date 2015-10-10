

import fetch from 'isomorphic-fetch';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
} from '../constants';


/**
 * Load collections.
 */
export function loadCollections() {
  return dispatch => {

    // Notify start.
    dispatch(requestCollections());

    fetch('/api/collections.json')
    .then(res => res.json())
    .then(json => dispatch(receiveCollections(json)));

  };
}


/**
 * When collections are requested.
 */
function requestCollections() {
  return {
    type: REQUEST_COLLECTIONS,
  };
}


/**
 * When collections are loaded.
 *
 * @param {Object} json
 */
function receiveCollections(json) {
  return {
    type: RECEIVE_COLLECTIONS,
    geojson: json,
  };
}
