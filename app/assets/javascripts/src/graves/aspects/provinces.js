

import _ from 'lodash';
import L from 'leaflet';
import wellknown from 'wellknown';
import styles from './provinces.yml';
import Aspect from '../lib/aspect';


export default class extends Aspect {


  /**
   * Spin up the Leaflet map.
   *
   * @param {Leaflet.Map} map
   * @param {Object} store
   */
  constructor(map, store) {
    super(store);
    this.map = map;
  }


  /**
   * Attach to `provinces`.
   *
   * @param {Object} state - The new state.
   */
  mapState(state) {
    return state.provinces.items;
  }


  /**
   * Manifest a new state.
   *
   * @param {Object} state - The mapped state.
   */
  render(items) {

    let features = items.map(p => {
      let points = wellknown(p.geometry);
      return new L.GeoJSON(points, styles.path);
    });

    let provinces = L.featureGroup(features);
    provinces.addTo(this.map);

  }


}
