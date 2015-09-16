

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import wellknown from 'wellknown';
import styles from './province.yml';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    feature: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    idMap: PropTypes.object.isRequired,
  }


  /**
   * Add the province.
   */
  componentWillMount() {

    // Parse GeoJSON.
    let feature = JSON.parse(this.props.feature.geojson);

    let options = {
      ...styles.path.def,
      id: this.props.feature.id,
    };

    // Create the polygon.
    this.layer = L.multiPolygon(feature.coordinates, options);

    // Register the layer.
    this.props.idMap[this.props.feature.id] = this.layer;
    this.props.group.addLayer(this.layer);

  }


  /**
   * Render the map container.
   */
  render() {
    return null;
  }


}
