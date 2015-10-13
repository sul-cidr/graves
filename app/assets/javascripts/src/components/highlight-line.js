

import $ from 'jquery';
import React from 'react';
import RadioComponent from '../lib/radio-component';
import { getLeafletInstance } from '../events/map';
import { getCollectionLonLat } from '../events/collections';
import { parseAttr } from '../utils';

import {
  HOVER_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'spans'


  static events = {
    collections: {
      [HOVER_COLLECTION]: 'show',
      [UNHIGHLIGHT_COLLECTION]: 'hide',
    }
  }


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
    this.map = getLeafletInstance();

  }


  /**
   * Update the line when the map moves.
   */
  bindMoveListener() {
    this.map.on('move', this.update);
  }


  /**
   * Remove the move listener.
   */
  unbindMoveListener() {
    this.map.off('move', this.update);
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
        this.state.lat
      );

      let padding = 5;

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
      <svg className="highlight-line">
        {line}
      </svg>
    );

  }


  /**
   * Convert lon/lat -> screen pixels.
   *
   * @param {Number} lon
   * @param {Number} lat
   */
  lonLatToXY(lon, lat) {

    // Coordinate -> layer point.
    let layerPoint = this.map.latLngToLayerPoint([lat, lon]);

    // Layer point -> screen point.
    let point = this.map.layerPointToContainerPoint(layerPoint);

    return [point.x, point.y];

  }


}
