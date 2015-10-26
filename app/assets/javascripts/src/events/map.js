

import Radio from 'backbone.radio';

import {
  MAP,
  GET_LEAFLET_INSTANCE,
  FOCUS_MAP,
} from '../constants';


const channel = Radio.channel(MAP);


/**
 * Get the Leaflet map instance.
 *
 * @return {Leaflet.Map}
 */
export function getLeafletInstance() {
  return channel.request(GET_LEAFLET_INSTANCE);
}


/**
 * Focus the map on a point.
 *
 * @param {Number} lon
 * @param {Number} lat
 * @param {Number} zoom
 */
export function focusMap(lon, lat, zoom) {
  return channel.request(FOCUS_MAP, lon, lat, zoom);
}
