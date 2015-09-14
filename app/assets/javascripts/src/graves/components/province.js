

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import wellknown from 'wellknown';
import styles from './province.yml';


@connect(state => ({
  highlighted: state.provinces.highlighted
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    feature: PropTypes.object.isRequired,
    highlighted: PropTypes.any,
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

    if (this.props.highlighted === this.props.feature.id) {
      this.layer.setStyle({ color: 'red' });
    } else {
      this.layer.setStyle(styles.path);
    }

    return null;

  }


}
