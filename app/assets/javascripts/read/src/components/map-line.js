

import $ from 'jquery';
import React, { PropTypes } from 'react';
import Portal from 'react-portal';

import Component from './component';


import {
  MAP,
  SHOW_MAP_LINE,
  HIDE_MAP_LINE,
} from '../constants';


export default class extends Component {


  static requests = {
    [MAP]: {
      [SHOW_MAP_LINE]: 'show',
      [HIDE_MAP_LINE]: 'hide',
    }
  };


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);
    this.state = { span: null };

    // Map move callback.
    this.update = this.forceUpdate.bind(this, null);

  }


  /**
   * Update the line when the map moves.
   */
  bindMoveListener() {
    this.props.map.on('move', this.update);
  }


  /**
   * Remove the move listener.
   */
  unbindMoveListener() {
    this.props.map.off('move', this.update);
  }


  /**
   * Show a line for a collection.
   *
   * @param {Object} span
   * @param {Number} lon
   * @param {Number} lat
   */
  show(span, lon, lat) {

    let width   = span.outerWidth();
    let offset  = span.offset();
    let top     = offset.top - $(window).scrollTop();
    let left    = offset.left;

    this.setState({ span, lon, lat, width, top, left });
    this.bindMoveListener();

  }


  /**
   * Remove the line, move listener.
   */
  hide() {
    this.setState({ span: null });
    this.unbindMoveListener();
  }


  /**
   * Ensure move listener is removed.
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.unbindMoveListener();
  }


  /**
   * Render highlight line.
   */
  render() {

    let line = null;

    if (this.state.span) {

      // Map offset.
      let [x2, y2] = this.lonLatToXY(
        this.state.lon,
        this.state.lat,
      );

      let padding = 10;

      // Text X.
      let x1 = x2 > this.state.left ?
        this.state.left + this.state.width + padding :
        this.state.left - padding;

      // Text Y.
      let y1 = this.state.top + padding;

      line = <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />;

    }

    return (
      <Portal isOpened>
        <svg id="map-line">
          {line}
        </svg>
      </Portal>
    );

  }


  /**
   * Convert lon/lat -> container pixels.
   *
   * @param {Number} lon
   * @param {Number} lat
   */
  lonLatToXY(lon, lat) {

    // Get the top offset.
    let scrollTop = $(window).scrollTop();
    let offsetTop = $(this.props.map.getContainer()).offset().top;
    let top = offsetTop - scrollTop;

    // Convert the lon/lat -> container pixels.
    let point = this.props.map.latLngToContainerPoint([lat, lon]);

    return [point.x, point.y+top];

  }


}
