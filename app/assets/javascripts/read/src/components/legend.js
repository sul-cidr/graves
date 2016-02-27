

import d3 from 'd3';
import React from 'react';

window.d3 = d3;
import 'd3-svg-legend';

import Component from './component';


export default class extends Component {


  /**
   * Render the legend.
   */
  componentDidMount() {
    // TODO
  }


  /**
   * Render the legend container.
   */
  render() {
    return (
      <svg id="legend" ref="svg">
      </svg>
    );
  }


}
