

import React, { PropTypes } from 'react';
import L from 'leaflet';

import Component from './component';
import scale from './collection-scale';
import styles from './collection.yml';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  };


  static propTypes = {
    group: PropTypes.object.isRequired,
    idToLayer: PropTypes.object.isRequired,
    feature: PropTypes.object.isRequired,
  };


  /**
   * Add the collection.
   */
  componentWillMount() {

    let feature = this.props.feature;

    let path = feature.properties.num_graves ?
      styles.path.count :
      styles.path.nocount;

    // Create the marker.
    this.layer = L.circleMarker(feature.geometry.coordinates, {
      feature, ...path
    });

    // Size by grave count.
    let r = scale(feature.properties.num_graves || 7);
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
