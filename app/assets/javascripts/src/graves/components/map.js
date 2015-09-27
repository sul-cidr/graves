

import L from 'leaflet';
import React, { Component, findDOMNode, PropTypes } from 'react';
import MapPosition from './map-position';
import CollectionGroup from './collection-group';


export default class extends Component {


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
    this.state = { map: null };
  }


  /**
   * Expose the map instance to children.
   */
  getChildContext() {
    return {
      map: this.state.map
    };
  }


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {

    let el = findDOMNode(this.refs.map);

    let map = L.map(el, {
      zoomControl: false,
      attributionControl: false,
      fadeAnimation: false,
      scrollWheelZoom: false,
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

    this.setState({ map: map });

  }


  /**
   * Render the map container.
   */
  render() {

    if (this.state.map) {
      return (
        <div id="map" ref="map">
          <MapPosition />
          <CollectionGroup />
        </div>
      );
    }

    else return (
      <div id="map" ref="map">
      </div>
    );

  }


}
