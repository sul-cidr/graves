

import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import L from 'leaflet';

import config from './map.yml';


export default class extends Component {


  /**
   * Start the map.
   */
  componentDidMount() {
    this.createMap();
  }


  /**
   * Spin up the Leaflet instance.
   */
  createMap() {

    let el = findDOMNode(this.refs.map);

    let map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: false,
      fadeAnimation: false,
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    map.addControl(zoomControl);

    // OSP base layer.
    let osmLayer = L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    map.addLayer(osmLayer);

    // Default viewport.
    let { lat, lng, zoom } = config.focus;
    map.setView([lat, lng], zoom);

  }


  /**
   * Render the map container.
   */
  render() {
    return (
      <div id="map" ref="map">
      </div>
    );
  }


}
