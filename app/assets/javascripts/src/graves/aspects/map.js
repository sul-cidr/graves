

import L from 'leaflet';
import Aspect from '../lib/aspect';
import Provinces from './provinces';


export default class extends Aspect {


  /**
   * Spin up the Leaflet map.
   *
   * @param {Object} el
   * @param {Object} store
   */
  constructor(el, store) {

    let map = L.map(el, {
      zoomControl: false,
      attributionControl: false,
      fadeAnimation: false
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    map.addControl(zoomControl);

    // OSM base layer.
    let osmLayer = L.tileLayer(
      '//{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    map.addLayer(osmLayer);

    // Default viewport.
    map.setView([30, 115], 5);

    new Provinces(map, store);
    super(store);

  }


}
