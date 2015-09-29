

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/counties';


@connect(
  state => ({
    code: state.counties.choropleth
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    g: PropTypes.array.isRequired,
    code: PropTypes.any,
  }


  // TODO|dev
  componentDidMount() {
    this.props.showChoropleth('a100001_10');
  }


  /**
   * Apply the choropleth.
   */
  componentDidUpdate() {

    if (this.props.code) {
      this.props.g.selectAll('path').attr('fill-opacity', f => {
        return f.properties.choropleths[this.props.code];
      });
    }

  }


  render() {
    return null;
  }


}
