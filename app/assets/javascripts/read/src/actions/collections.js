

import $ from 'jquery';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  SELECT_COLLECTION,
  UNSELECT_COLLECTION,
} from '../constants';


/**
 * Load collections.
 */
export function loadCollections() {
  return dispatch => {

    // Notify start.
    dispatch(requestCollections());

    $.getJSON('/api/collections.json', json => {
      dispatch(receiveCollections(json));
    })

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
 * @param {Object} geojson
 */
function receiveCollections(geojson) {
  return {
    type: RECEIVE_COLLECTIONS,
    geojson,
  };
}


/**
 * Select a collection.
 *
 * @param {Object} feature
 */
export function selectCollection(feature) {
  return {
    type: SELECT_COLLECTION,
    feature: feature,
  };
}


/**
 * Unselect a collection.
 *
 * @param {Object} feature
 */
export function unselectCollection() {
  return {
    type: UNSELECT_COLLECTION,
  };
}
