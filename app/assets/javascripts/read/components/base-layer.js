

import L from 'leaflet';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(state => state.baseLayer)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
    layerId: PropTypes.number.isRequired,
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

    // Get bootstrapped layer configuration.
    let config = window.GRAVES.baseLayers[this.props.layerId];

    this.layer = L.tileLayer(config.url, {
      detectRetina: true
    });

    this.props.map.addLayer(this.layer);

    return null;

  }


}
