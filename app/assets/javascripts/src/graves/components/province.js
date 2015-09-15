

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
    highlighted: PropTypes.any,
    group: PropTypes.object.isRequired,
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

    // Add layer.
    this.layer = L.multiPolygon(feature.coordinates, options);
    this.props.group.addLayer(this.layer);

  }


  /**
   * Only update when the highlight changes.
   *
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {
    return this.props.highlighted != nextProps.highlighted;
  }


  /**
   * Render the map container.
   */
  render() {

    let path = this.props.highlighted ?
      styles.path.hl :
      styles.path.def;

    this.layer.setStyle(path);

    return null;

  }


}
