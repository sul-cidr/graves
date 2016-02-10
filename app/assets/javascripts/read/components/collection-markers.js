

import L from 'leaflet';
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/collections';


@connect(
  state => ({
    geojson: state.collections.geojson
  }),
  actions,
)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Initialize the feature group and ID map.
   */
  componentWillMount() {

    this.idToMarker = {};

    // Create a group for the markers.
    this.group = L.featureGroup();
    this.group.addTo(this.props.map);

  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.loadCollections();
  }


  render() {

    if (this.props.geojson) {

      // Clear existing markers.
      this.group.clearLayers();

      _.each(this.props.geojson.features, f => {

        let marker = L.circleMarker(f.geometry.coordinates, {
          feature: f,
          className: 'collection',
        });

        let label = (
          f.properties.town_p ||
          f.properties.county_p ||
          f.properties.province_p
        );

        // Attach popup.
        marker.bindPopup(label, {
          minWidth: 0,
          closeButton: false,
          autoPan: false,
        });

        this.idToMarker[f.id] = marker;
        this.group.addLayer(marker);

      });

    }

    return null;

  }


}
