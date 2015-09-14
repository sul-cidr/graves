

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
  }


  /**
   * Add the province.
   */
  componentDidMount() {

    // Parse WKT.
    let points = wellknown(this.props.feature.geometry);

    // Add layer.
    this.layer = new L.GeoJSON(points, {
      style: () => styles.path
    });

    this.layer.addTo(this.context.map);

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
