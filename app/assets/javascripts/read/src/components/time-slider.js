

import d3 from 'd3';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => ({
  geojson: state.collections.geojson
}))
export default class extends Component {


  static propTypes = {
    geojson: PropTypes.object,
  };


  /**
   * Create slider when mounted.
   */
  componentDidMount() {
    this.makeBrush();
  }


  /**
   * Render the time slider.
   */
  render() {
    return (
      <div id="time-slider">
        <div ref="slider"></div>
      </div>
    );
  }


  /**
   * Create the brush slider.
   */
  makeBrush() {

    // TODO

    let container = d3.select(this.refs.slider);

    let w = container.node().offsetWidth;
    let h = 50;

    let timeExtent = [
      new Date(2000, 1, 1),
      new Date(2016, 1, 1),
    ];

    let svg = container.append('svg')
      .attr('width', w)
      .attr('height', h);

    let context = svg.append('g')
      .classed('context', true);

    let xAxis = d3.time.scale()
      .range([0, w])
      .domain(timeExtent);

    let brush = d3.svg.brush()
      .x(xAxis);

    context.selectAll('circle.collection')

      .data(this.props.geojson.features)
      .enter()
      .append('circle')

      .attr('transform', function(d) {
        let date = new Date(d.properties.notice.deadline);
        return `translate(${xAxis(date)},${h/2})`
      })

      .attr('r', 5);

  }


}
