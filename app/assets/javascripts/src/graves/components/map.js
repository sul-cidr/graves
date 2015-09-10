

import L from 'leaflet';
import React, { Component, findDOMNode, PropTypes } from 'react';
import styles from './map.yml';
import Provinces from './provinces';


class Map extends Component {


  static childContextTypes = {
    map: PropTypes.object
  }


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      map: null
    };

  }


  /**
   * Expose the map instance to children.
   */
  getChildContext() {
    return { map: this.state.map };
  }


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {

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

    this.setState({ map: map });

  }


  /**
   * Render the map container.
   */
  render() {

    // Wait for Leaflet.
    let children = this.state.map ? (
      <Provinces />
    ) : null;

    return (
      <div id="map" ref="map">
        {children}
      </div>
    );

  }


}


export default Map;
