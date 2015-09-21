

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
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
   * Create the feature group, request counties.
   */
  componentWillMount() {
    // TODO
  }


  /**
   * Request counties.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadCounties());
  }


  render() {
    console.log(this.props.features);
    return null;
  }


}
