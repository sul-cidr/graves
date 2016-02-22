

import Radio from 'backbone.radio';

import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  ZOOM_TO_COLLECTION,
  GET_COLLECTION_LON_LAT,
} from '../constants';


const channel = Radio.channel(COLLECTIONS);


/**
 * Highlight a collection.
 *
 * @param {Number} id
 */
export function highlightCollection(id) {
  channel.trigger(HIGHLIGHT_COLLECTION, id);
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
 * Zoom the map on a collection.
 *
 * @param {Number} id
 */
export function zoomToCollection(id) {
  channel.trigger(ZOOM_TO_COLLECTION, id);
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
