

import _ from 'lodash';
import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, findDOMNode } from 'react';
import store from '../store';
import { loadProvinces } from '../actions/provinces';


@connect(state => (state.provinces))
export default class extends Component {


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {

    let el = findDOMNode(this.refs.map);

    // TODO: Break out.

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

    // TODO|dev
    this.props.dispatch(loadProvinces());

  }


  /**
   * Render the map container.
   */
  render() {
    console.log(this.props);
    return <div id="map" ref="map">Map</div>;
  }


}
