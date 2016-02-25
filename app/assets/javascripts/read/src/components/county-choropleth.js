

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


// TODO: Rename to <Choropleth />, set default.


@connect(state => ({
  code: state.counties.choropleth
}))
export default class extends Component {


  static propTypes = {
    g: PropTypes.array.isRequired,
    code: PropTypes.string,
  };


  /**
   * Render the county choropleth.
   */
  render() {

    this.props.g

      // Show/hide the container.
      .classed('hidden', _.isNull(this.props.code))

      // Apply the CDC variable.
      .selectAll('path').attr('fill-opacity', f => {
        return f.properties.choropleths[this.props.code] || 0;
      });

    return null;

  }


}
