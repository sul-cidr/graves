

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    feature: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  }


  /**
   * Add the collection.
   */
  componentWillMount() {
    // TODO
  }


  /**
   * Remove the province.
   */
  componentWillUnmount() {
    // TODO
  }


  /**
   * Render the map container.
   */
  render() {
    return null;
  }


}
