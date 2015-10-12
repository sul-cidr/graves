

import Radio from 'backbone.radio';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  HOVER_COLLECTION,
  SELECT_COLLECTION,
  GET_COLLECTION_OFFSET,
} from '../constants';


const channel = Radio.channel('collections');


/**
 * Highlight a collection.
 *
 * @param {Number} id
 */
export function highlightCollection(id) {
  channel.trigger(HIGHLIGHT_COLLECTION, id);
}


/**
 * When a collection span is hovered.
 *
 * @param {Object} e
 */
export function hoverCollection(e) {
  channel.trigger(HOVER_COLLECTION, e);
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
 * @param {Number} zoom
 */
export function selectCollection(id, zoom) {
  channel.trigger(SELECT_COLLECTION, id, zoom);
}


/**
 * Get the pixel-space offset of a collection.
 *
 * @param {Number} id
 * @return {Array}
 */
export function getCollectionOffset(id) {
  return channel.request(GET_COLLECTION_OFFSET, id);
}


/**
 * Get the pixel-space offset of an anchor.
 *
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array}
 */
export function getAnchorOffset(lon, lat) {
  return channel.request(GET_ANCHOR_OFFSET, lon, lat);
}
