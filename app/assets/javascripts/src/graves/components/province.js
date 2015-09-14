

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import wellknown from 'wellknown';


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
    this.layer = new L.GeoJSON(points);
    this.layer.addTo(this.context.map);

  }


  /**
   * Render the map container.
   */
  render() {
    return null;
  }


}
