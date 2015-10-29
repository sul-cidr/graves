

import d3 from 'd3-svg-legend';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';


export default class extends Component {


  /**
   * Draw China, inject extent box.
   */
  componentDidMount() {

    let svg = d3.select(findDOMNode(this));

    let size = d3.scale.linear()
      .domain([0, 10])
      .range([10, 30]);

    let g = svg.append('g')
      .classed('legendSize', true)
      .attr('transform', 'translate(0, 40)');

    let legend = d3.legend.size()
      .scale(size)
      .shape('circle')
      .shapePadding(5)
      .labelOffset(20)
      .orient('horizontal');

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
