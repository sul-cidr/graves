

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import styles from './collection.yml';


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
   * Add the collection.
   */
  componentWillMount() {

    let feature = this.props.feature;

    // Create the marker.
    this.layer = L.circleMarker(feature.geometry.coordinates, {
      id: feature.id,
      ...styles.path.def,
    });

    // Size by grave count.
    let r = Math.log(feature.properties.num_graves || 20) * 3;
    this.layer.setRadius(r);

    let label = (
      feature.properties.town_p ||
      feature.properties.county_p ||
      feature.properties.province_p
    );

    // Attach the popup.
    this.layer.bindPopup(label, {
      minWidth: 0,
      closeButton: false,
    });

    // Register the layer.
    this.props.idMap[feature.id] = this.layer;
    this.props.group.addLayer(this.layer);

  }


  render() {
    return null;
  }


}
