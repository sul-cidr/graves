

import Map from '../../src/components/map';

import { getComponent } from './redux';


/**
 * Pluck out the Leaflet map instance.
 *
 * @return {Leaflet.Map}
 */
export function getLeaflet() {
  return getComponent(Map).state.map;
}
