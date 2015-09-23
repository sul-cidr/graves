

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/counties';


@connect(
  state => ({
    layers: state.counties.layers,
    choropleth: state.counties.choropleth,
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    layers: PropTypes.object.isRequired,
    choropleth: PropTypes.any,
  }


  /**
   * TODO|dev
   */
  componentDidMount() {
    this.props.renderChoropleth('test');
  }


  /**
   * Manifest the current choropleth.
   */
  componentDidUpdate() {
    console.log(this.props.choropleth);
  }


  render() {
    return null;
  }


}
