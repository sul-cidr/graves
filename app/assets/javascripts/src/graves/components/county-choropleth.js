

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  code: state.counties.choropleth
}))
export default class extends Component {


  static propTypes = {
    g: PropTypes.array.isRequired,
    code: PropTypes.any,
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
