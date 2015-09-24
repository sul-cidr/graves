

import _ from 'lodash';
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
    this.props.renderChoropleth('a100001_10');
  }


  /**
   * Manifest the current choropleth.
   */
  componentDidUpdate() {
    // TODO
  }


  render() {
    return null;
  }


}
