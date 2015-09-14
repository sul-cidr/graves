

import React, { Component, findDOMNode } from 'react';


export default class extends Component {


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {
    console.log(findDOMNode(this.refs.map));
    // TODO: Start map.
  }


  /**
   * Render the map container.
   */
  render() {
    return <div id="map" ref="map">Map</div>;
  }


}
