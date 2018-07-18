

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/map';

import Component from './component';


@connect(
  state => ({
    code: state.counties.choropleth
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    g: PropTypes.array.isRequired,
    code: PropTypes.string,
    changeChoropleth: PropTypes.func.isRequired,
  };


  /**
   * Show the initial CDC choropleth.
   */
  componentDidMount() {
    this.props.changeChoropleth(window.GRAVES.choroplethCode);
  }

  /**
   * Render the county choropleth.
   */
  render() {

    this.props.g

      // Show/hide the container.
      .classed('hidden', _.isNull(this.props.code))

      // Set the code (for testing).
      .attr('data-code', this.props.code)

      // Apply the CDC variable.
      .selectAll('path').attr('fill-opacity', f => {
        return f.properties.choropleths[this.props.code] || 0;
      });

    return null;

  }


}
