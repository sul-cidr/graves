

import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import { countToRadius } from './collection-scale';

import {
  TIME_SLIDER,
  SET_TIME_SLIDER_RANGE,
} from '../constants';

import {
  setDateRange,
  unsetDateRange,
} from '../events/time-slider';


@connect(state => ({
  geojson: state.collections.geojson
}))
export default class extends Component {


  static events = {
    [TIME_SLIDER]: {
      [SET_TIME_SLIDER_RANGE]: 'setRange'
    }
  };


  static propTypes = {
    geojson: PropTypes.object,
  };


  /**
   * Create slider when mounted.
   */
  componentDidMount() {

    this.draw();

    // Re-render on resize.
    let resize = _.debounce(this.draw.bind(this), 500);
    $(window).on('resize.time', resize);

  }


  /**
   * Re-render when the collections change.
   */
  componentDidUpdate() {
    this.draw();
  }


  /**
   * Clear the date range when unmounted.
   */
  componentWillUnmount() {

    unsetDateRange();

    // Unbing the resize listener.
    $(window).off('resize.time');

  }


  /**
   * Render the time slider.
   */
  render() {
    return (
      <div id="time-slider" ref="slider">
      </div>
    );
  }


  /**
   * Build the time slider.
   */
  draw() {


    if (!this.props.geojson) return;


    // Clear existing <svg>.
    let container = d3.select(this.refs.slider);
    container.select('svg').remove();

    // Measure the container.
    let rect = container.node().getBoundingClientRect();

    // Inject wrappers.
    let svg = container.append('svg');
    let context = svg.append('g');

    let timeExtent = [
      new Date(2000, 0, 1),
      new Date(2015, 0, 1),
    ];

    let xScale = d3.time.scale()
      .domain(timeExtent)
      .range([20, rect.width-20]);

    let xAxis = d3.svg.axis()
      .scale(xScale)
      .ticks(d3.time.years, 1)
      .orient('bottom');

    this.brush = d3.svg.brush()
      .on('brush', this.onBrush.bind(this))
      .x(xScale);


    // Markers
    context.selectAll('circle.collection')

      .data(this.props.geojson.features)
      .enter()
      .append('circle')

      // Distinguish no-count markers.
      .classed({
        collection: true,
        nocount: function(d) {
          return !d.properties.num_graves;
        }
      })

      // X-axis offset.
      .attr('transform', function(d) {
        let date = new Date(d.properties.notice.deadline);
        return `translate(${xScale(date)},${rect.height/2})`
      })

      // Radius.
      .attr('r', function(d) {
        return countToRadius(d.properties.num_graves) * 0.5;
      });

    // Brush
    context.append('g')
      .call(this.brush)
      .attr('class', 'x brush')
      .selectAll('rect')
      .attr('height', rect.height);

    // X-axis
    context.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${rect.height+10})`)
      .call(xAxis);


    // Show all markers, by default.
    unsetDateRange();


  }


  /**
   * When the brush is changed.
   */
  onBrush() {
    let [start, end] = this.brush.extent();
    setDateRange(start, end);
  }


  /**
   * Manifest a new range.
   *
   * @param {moment} start
   * @param {moment} end
   */
  setRange(start, end) {
    console.log('range');
  }


}
