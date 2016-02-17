

import L from 'leaflet';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/base-layer';


@connect(
  state => state.baseLayer,
  actions,
)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
    changeBaseLayer: PropTypes.func.isRequired,
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
   * Show the default layer.
   */
  componentDidMount() {
    this.props.changeBaseLayer(window.GRAVES.baseLayerId);
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
      let config = window.GRAVES.baseLayers[this.props.layerId];

      this.layer = L.tileLayer(config.url, {
        detectRetina: true
      });

      this.props.map.addLayer(this.layer);

    }

    return null;

  }


}
