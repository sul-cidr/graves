

import Radio from 'backbone.radio';

import {
  GET_LEAFLET_INSTANCE,
} from '../constants';


const channel = Radio.channel('map');


/**
 * Get the Leaflet map instance.
 *
 * @return {Leaflet.Map}
 */
export function getLeafletInstance() {
  return channel.request(GET_LEAFLET_INSTANCE);
}
