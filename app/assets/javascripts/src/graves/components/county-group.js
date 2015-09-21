

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes, findDOMNode } from 'react';
import d3 from 'd3-browserify';
import * as actions from '../actions/counties';
import CountyLayer from './county-layer';


@connect(state => ({
  features: state.counties.features
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Request counties.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadCounties());
  }


  /**
   * Render d3-controlled paths.
   */
  render() {
    return null;
  }


}
