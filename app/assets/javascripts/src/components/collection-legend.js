

import d3 from 'd3-svg-legend';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import scale from './collection-scale';


export default class extends Component {


  /**
   * Draw China, inject extent box.
   */
  componentDidMount() {

    let svg = d3.select(findDOMNode(this));

    let g = svg.append('g')
      .classed('legendSize', true)
      .attr('transform', 'translate(0, 40)');

    let legend = d3.legend.size()
      .shape('circle')
      .shapePadding(5)
      .labelOffset(20)
      .orient('horizontal')
      .labelFormat(d3.format('0,000'))
      .cells([10, 100, 1000, 10000])
      .scale(scale);

    g.call(legend);

  }


  /**
   * Render the collection legend.
   */
  render() {
    return (
      <svg id="collection-legend">
      </svg>
    );
  }


}
