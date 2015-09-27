

import Radio from 'backbone.radio';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  SELECT_COLLECTION,
} from '../constants';


const channel = Radio.channel('collections');


/**
 * Highlight a collection.
 *
 * @param {Number} id
 * @param {String} origin
 */
export function highlightCollection(id, origin=null) {
  channel.trigger(HIGHLIGHT_COLLECTION, id, origin);
}


/**
 * Unhighlight collections.
 *
 * @param {Number} id
 */
export function unhighlightCollection(id) {
  channel.trigger(UNHIGHLIGHT_COLLECTION, id);
}


/**
 * Select a collection.
 *
 * @param {Number} id
 */
export function selectCollection(id) {
  channel.trigger(SELECT_COLLECTION, id);
}
