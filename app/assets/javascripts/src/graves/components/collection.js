

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import styles from './collection.yml';


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
   * Add the collection.
   */
  componentWillMount() {

    // Parse GeoJSON.
    let feature = JSON.parse(this.props.feature.geojson);

    let options = {
      ...styles.path.def,
      id: this.props.feature.id,
    };

    // Create the marker.
    this.layer = L.circleMarker(feature.coordinates, options);

    // Size by grave count.
    let r = Math.log(this.props.feature.num_graves || 20) * 3;
    this.layer.setRadius(r);

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
