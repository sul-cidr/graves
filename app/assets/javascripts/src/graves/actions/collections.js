

import fetch from 'isomorphic-fetch';
import * as constants from '../constants';


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
    type: constants.REQUEST_COLLECTIONS,
  };
}


/**
 * When collections are loaded.
 *
 * @param {Object} json
 */
function receiveCollections(json) {
  return {
    type: constants.RECEIVE_COLLECTIONS,
    features: json,
  };
}


/**
 * Map ids to Leaflet layers.
 *
 * @param {Object} idMap
 */
export function renderCollections(idMap) {
  return {
    type: constants.RENDER_COLLECTIONS,
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
    type: constants.HIGHLIGHT_COLLECTION,
    id: id,
  };
}


/**
 * Unhighlight collections.
 */
export function unhighlightCollection() {
  return {
    type: constants.UNHIGHLIGHT_COLLECTION,
  };
}


/**
 * Select an individual collection.
 *
 * @param {Number} id
 */
export function selectCollection(id) {
  return {
    type: constants.SELECT_COLLECTION,
    id: id,
  };
}


/**
 * Unselect collections.
 */
export function unselectCollection() {
  return {
    type: constants.UNSELECT_COLLECTION,
  };
}
