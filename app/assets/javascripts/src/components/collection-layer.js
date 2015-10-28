

import React, { PropTypes } from 'react';
import L from 'leaflet';

import Component from './component';
import styles from './collection.yml';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    group: PropTypes.object.isRequired,
    idToLayer: PropTypes.object.isRequired,
    feature: PropTypes.object.isRequired,
  }


  /**
   * Add the collection.
   */
  componentWillMount() {

    let feature = this.props.feature;

    // Create the marker.
    this.layer = L.circleMarker(feature.geometry.coordinates, {
      feature,
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
      autoPan: false,
    });

    // Register the layer.
    this.props.idToLayer[feature.id] = this.layer;
    this.props.group.addLayer(this.layer);

  }


}
