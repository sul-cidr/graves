

import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/counties';


@connect(
  state => ({
    code: state.counties.choropleth,
    g: state.counties.g,
  }),
  actions
)
export default class extends Component {


  /**
   * TODO|dev
   */
  componentDidMount() {
    this.props.renderChoropleth('a100017_10');
  }


  /**
   * Manifest the current choropleth.
   */
  componentDidUpdate() {

    if (!this.props.g) return;

    if (this.props.code) {

      this.props.g.selectAll('path').attr('fill-opacity', f => {
        return f.properties.choropleths[this.props.code];
      });

      this.props.g.classed('choropleth', true);

    }

  }


  render() {
    return null;
  }


}
