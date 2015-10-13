

import Radio from 'backbone.radio';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  HOVER_COLLECTION,
  SELECT_COLLECTION,
  GET_COLLECTION_LON_LAT,
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
 * @param {Object} span
 * @param {Number} lon
 * @param {Number} lat
 */
export function hoverCollection(span, lon, lat) {
  channel.trigger(HOVER_COLLECTION, span, lon, lat);
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
 * Get the lon/lat of a collection.
 *
 * @param {Number} id
 * @return {Array}
 */
export function getCollectionLonLat(id) {
  return channel.request(GET_COLLECTION_LON_LAT, id);
}
