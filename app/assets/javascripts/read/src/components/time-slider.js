

import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../actions/filters';

import { countToRadius } from './collection-scale';
import Component from './component';

import {
  TIME_SLIDER,
  SET_TIME_SLIDER_RANGE,
} from '../constants';


@connect(
  state => ({
    geojson: state.collections.geojson
  }),
  actions
)
export default class extends Component {


  static requests = {
    [TIME_SLIDER]: {
      [SET_TIME_SLIDER_RANGE]: 'setRange'
    }
  };


  static propTypes = {
    geojson: PropTypes.object,
    setDateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
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

    this.props.clearFilters();

    // Unbind the resize listener.
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

    this.timeRange = [
      window.GRAVES.timeSliderStartYear || 2000,
      window.GRAVES.timeSliderEndYear || 2015
    ];
    let timeExtent = [
      new Date(this.timeRange[0], 0, 1),
      new Date(this.timeRange[1], 0, 1),
    ];
    let timeDiff = this.timeRange[1] - this.timeRange[0];

    let xScale = d3.time.scale()
      .domain(timeExtent)
      .range([25, rect.width - 25]);

    let xAxis = d3.svg.axis()
      .scale(xScale)
      .ticks(d3.time.years,
             // print 10 or 15 ticks (for backwards compatibility)
             parseInt(timeDiff / (timeDiff % 15 === 0 ? 15 : 10)))
      .orient('bottom');

    this.brush = d3.svg.brush()
      .on('brush', this.onBrush.bind(this))
      .x(xScale);

    this.arc = d3.svg.arc()
      .outerRadius(25)
      .startAngle(0)
      .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

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

    // Brush <g>.
    this.handle = context.append('g')
      .call(this.brush)
      .attr('class', 'x brush');

    // Handle "knobs"
    this.handle.selectAll(".resize").append("path")
      .attr("transform", "translate(0," + 25 + ")")
      .attr("d", this.arc);

    // Brush <rect>.
    this.handle.selectAll('rect')
      .attr('height', rect.height);

    // X-axis
    context.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${rect.height+10})`)
      .call(xAxis);


    this.props.clearFilters();


  }


  /**
   * When the brush is changed.
   */
  onBrush() {
    let [start, end] = this.brush.extent();
    this.props.setDateFilter(start, end);
  }


  /**
   * Manifest a new range.
   *
   * @param {String} start
   * @param {String} end
   */
  setRange(start, end) {

    this.brush.extent([
      moment(start).toDate(),
      moment(end).toDate(),
    ]);

    this.brush(this.handle);
    this.brush.event(this.handle);

  }


}
