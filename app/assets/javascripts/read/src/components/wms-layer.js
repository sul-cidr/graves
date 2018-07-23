
import _ from 'lodash';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/map';

import Component from './component';


@connect(
  state => ({
    slug: state.map.wmsLayerSlug
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    slug: PropTypes.string,
    map: PropTypes.object.isRequired,
    changeWmsLayer: PropTypes.func.isRequired,
  };


  /**
   * Track the current layer.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.layers = {};
  }

  /**
   * Show the initial WMS layer.
   */
  componentDidMount() {
    this.props.changeWmsLayer(window.GRAVES.wmsLayerSlug);
  }

  /**
   * Set the base layer.
   */
  render() {

    if (this.props.slug) {
      let slugs = this.props.slug.toString().split(",");

      // Remove unselected but active layers.
      for (let slug of Object.keys(this.layers)) {
        if (!(slug in slugs)) {
          let layer = this.layers[slug];
          this.props.map.removeLayer(layer);
          // this.layers.delete(slug);
          delete this.layers[slug];
        }
      }

      // Add selected layers.
      for (let slug of slugs) {
        let config = window.GRAVES.wmsLayers[slug];
        let layer = L.tileLayer.wms(config.address, {
          layers: config.layer,
          transparent: true,
          format: 'image/png',
        });
        if (!(slug in this.layers)) {
          this.layers[slug] = layer;
          this.props.map.addLayer(layer);
        }
      }

    }

    return null;

  }


}
