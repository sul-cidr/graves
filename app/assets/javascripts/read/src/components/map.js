

import React from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';

import config from './map.yml';
import Component from './component';

import BaseLayer from './base-layer';
import WmsLayer from './wms-layer';
import CollectionModal from './collection-modal';
import CollectionMarkers from './collection-markers';
import CountyPaths from './county-paths';
import SectionBoxes from './section-boxes';
import MapLine from './map-line';
import Controls from './controls';
import Widgets from './widgets';


import {
  MAP,
  FOCUS_MAP,
} from '../constants';


export default class extends Component {


  static requests = {
    [MAP]: {
      [FOCUS_MAP]: 'focus',
    }
  };


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      map: null,
    };

  }


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

    let el = findDOMNode(this.refs.leaflet);

    let map = L.map(el, {
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      fadeAnimation: false,
      inertia: false,
    });

    // Default viewport.
    let { lat, lng, zoom } = config.focus;
    map.setView([lat, lng], zoom);

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    map.addControl(zoomControl);

    // Mount behaviors.
    this.setState({ map });

  }


  /**
   * Render the map container.
   */
  render() {
    return (
      <div id="map">

        <div id="leaflet" ref="leaflet">
        </div>

        {this.state.map ? (
          <behaviors>

            <CountyPaths map={this.state.map} />
            <BaseLayer map={this.state.map} />
            <CollectionMarkers map={this.state.map} />
            <WmsLayer map={this.state.map} />
            <SectionBoxes map={this.state.map} />
            <MapLine map={this.state.map} />

            <CollectionModal />
            <Widgets />
            <Controls />

          </behaviors>
        ) : null}

      </div>
    );
  }


  /**
   * Focus on a point.
   *
   * @param {Number} lon
   * @param {Number} lat
   * @param {Number} zoom
   */
  focus(lon, lat, zoom=8) {
    this.state.map.flyTo([lat, lon], zoom, {
      duration: 1.5
    });
  }


}
