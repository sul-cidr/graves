

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
