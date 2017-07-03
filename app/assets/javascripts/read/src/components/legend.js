

import d3 from 'd3';
import React from 'react';

// TODO: browserify-shim?
window.d3 = d3;
import 'd3-svg-legend';

import Component from './component';
import { scale } from './collection-scale';


export default class extends Component {


  /**
   * Render the legend.
   */
  componentDidMount() {

    let svg = d3.select(this.refs.svg);

    let g = svg.append('g')
      .classed('legendSize', true)
      .attr('transform', 'translate(15, 40)');

    let legend = d3.legend.size()
      .shape('circle')
      .shapePadding(15)
      .labelOffset(20)
      .orient('horizontal')
      .labelFormat(d3.format('0,000'))
      .cells([7, 10000, 1000, 100])
      .labels(['Unknown'])
      .scale(scale);

    g.call(legend);

    // Apply the collection / nocount classes.
    g.selectAll('circle').classed({
      collection: true,
      nocount: function(d, i) { return i == 0 },
    });

    g.append('text')
      .attr('transform', 'translate(35, 70)')
      .text('Number of Graves');

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
