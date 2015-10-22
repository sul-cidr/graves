

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


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

    this.props.g.selectAll('path').attr('fill-opacity', f => {
      return f.properties.choropleths[this.props.code] || 0;
    });

  }


  render() {
    return null;
  }


}
