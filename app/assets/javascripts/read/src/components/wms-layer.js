

import L from 'leaflet';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(state => state.wmsLayer)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Track the current layer.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.layer = null;
  }


  /**
   * Set the base layer.
   */
  render() {

    // Remove the previous layer.
    if (this.layer) {
      this.props.map.removeLayer(this.layer);
    }

    if (this.props.layerId) {

      // Get layer configuration.
      let config = window.GRAVES.wmsLayers[this.props.layerId];

      this.layer = L.tileLayer.wms(config.address, {
        layers: config.layer,
        transparent: true,
        format: 'image/png',
      });

      this.props.map.addLayer(this.layer);

    }

    return null;

  }


}
