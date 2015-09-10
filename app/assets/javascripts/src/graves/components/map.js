

import L from 'leaflet';
import React, {Component, findDOMNode} from 'react';
import styles from './map.yml';
import Provinces from './provinces';


class Map extends Component {


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {

    // TODO|dev

    let map = L.map(findDOMNode(this.refs.map), {
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
    map.setView(
      styles.viewport.focus,
      styles.viewport.zoom
    );

  }


  /**
   * Render the map container.
   */
  render() {
    return (
      <div id="map" ref="map">
        <Provinces />
      </div>
    );
  }


}


export default Map;
