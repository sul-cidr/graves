

import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => ({
  slug: state.map.wmsLayerSlug
}))
export default class extends Component {


  static propTypes = {
    slug: PropTypes.string,
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

    if (this.props.slug) {

      // Get layer configuration.
      let config = window.GRAVES.wmsLayers[this.props.slug];

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
