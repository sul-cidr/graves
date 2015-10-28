

import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3-browserify';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Component from './component';

import chinaJSON from '../data/CHN.geo.json';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  /**
   * Draw China, inject extent box.
   */
  componentDidMount() {

    this.svg = d3.select(findDOMNode(this));

    this._plotChina();
    this._addMarkup();
    this._listenForResize();
    this._listenForMove();

  }


  /**
   * Plot the Chinese borders.
   */
  _plotChina() {

    let bbox = this.svg.node().getBoundingClientRect();

    let offset = [
      bbox.width  / 2,
      bbox.height / 2,
    ];

    this.projection = d3.geo.mercator()
      .center(d3.geo.centroid(chinaJSON))
      .scale(bbox.width * 0.8)
      .translate(offset);

    let path = d3.geo.path()
      .projection(this.projection);

    this.svg
      .append('path')
      .datum(chinaJSON)
      .attr('d', path);

  }


  /**
   * Inject UI elements.
   */
  _addMarkup() {

    // Extent <rect>.
    this.extent = this.svg.append('rect')
      .classed({ extent: true });

  }


  /**
   * Cache the viewport coordinates on resize.
   */
  _listenForResize() {

    this.cacheViewport();

    // Re-cache on resize.
    let resize = _.debounce(this.cacheViewport.bind(this), 500);
    $(window).resize(resize);

  }


  /**
   * Update the viewport rectangle when the map moves.
   */
  _listenForMove() {
    this.context.map.on('move', this.setExtent.bind(this));
  }


  /**
   * Set the container coordinates.
   */
  cacheViewport() {

    let w = $(window);

    this.tl = [0, 0];
    this.br = [w.width(), w.height()];

    this.setExtent();

  }


  /**
   * Mirror the map pan state.
   */
  setExtent() {

    var tl = this.context.map.containerPointToLatLng(this.tl);
    var br = this.context.map.containerPointToLatLng(this.br);

    tl = this.projection([tl.lng, tl.lat]);
    br = this.projection([br.lng, br.lat]);

    this.extent.attr({
      x:      tl[0],
      y:      tl[1],
      height: br[1]-tl[1],
      width:  br[0]-tl[0],
    });

  }


  /**
   * Render mini map container.
   */
  render() {
    return (
      <svg id="mini-map">
      </svg>
    );
  }


}
