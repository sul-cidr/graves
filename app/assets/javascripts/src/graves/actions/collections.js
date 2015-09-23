

import fetch from 'isomorphic-fetch';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  RENDER_COLLECTIONS,
  HIGHLIGHT_COLLECTIONS,
  UNHIGHLIGHT_COLLECTIONS,
} from '../constants';


/**
 * Load collections.
 */
export function loadCollections() {
  return dispatch => {

    // Notify start.
    dispatch(requestCollections());

    fetch('/api/collections')
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


/**
 * Map ids to Leaflet layers.
 *
 * @param {Object} idMap
 */
export function renderCollections(idMap) {
  return {
    type: RENDER_COLLECTIONS,
    layers: idMap,
  };
}


/**
 * Highlight an individual collection.
 *
 * @param {Number} id
 */
export function highlightCollection(id) {
  return {
    type: HIGHLIGHT_COLLECTION,
    id: id,
  };
}


/**
 * Unhighlight collections.
 */
export function unhighlightCollection() {
  return {
    type: UNHIGHLIGHT_COLLECTION,
  };
}
