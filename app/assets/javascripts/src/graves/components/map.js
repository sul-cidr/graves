

import { connect } from 'react-redux';
import React, { Component, findDOMNode } from 'react';
import store from '../store';
import { loadProvinces } from '../actions/provinces';
import MapAspect from '../aspects/map';


class Map extends Component {


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {

    let el = findDOMNode(this.refs.map);
    new MapAspect(el, store);

    // TODO|dev
    this.props.dispatch(loadProvinces());

  }


  /**
   * Render the map container.
   */
  render() {
    return <div id="map" ref="map">Map</div>;
  }


}


export default connect()(Map);
