

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
  }


  /**
   * Add the province.
   */
  componentWillMount() {

    // Parse WKT.
    let points = wellknown(this.props.feature.geometry);

    let options = {
      ...styles.path,
      id: this.props.feature.id,
    };

    // Add layer.
    this.layer = new L.GeoJSON(points, options);
    this.props.group.addLayer(this.layer);

  }


  /**
   * Remove the province.
   */
  componentWillUnmount() {
    this.context.map.remove(this.layer);
  }


  /**
   * Render the map container.
   */
  render() {
    return null;
  }


}
