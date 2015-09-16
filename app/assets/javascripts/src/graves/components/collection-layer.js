

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

    // Parse GeoJSON.
    let feature = this.props.feature;
    let geojson = JSON.parse(feature.geojson);

    let options = {
      ...styles.path.def,
      id: feature.id,
    };

    // Create the marker.
    this.layer = L.circleMarker(geojson.coordinates, options);

    // Size by grave count.
    let r = Math.log(feature.num_graves || 20) * 3;
    this.layer.setRadius(r);

    let label = (
      feature.town_p ||
      feature.county_p ||
      feature.province_p
    );

    // Attach the popup.
    this.layer.bindPopup(label, {
      closeButton: false,
      minWidth: 10,
    });

    // Register the layer.
    this.props.idMap[feature.id] = this.layer;
    this.props.group.addLayer(this.layer);

  }


  render() {
    return null;
  }


}
