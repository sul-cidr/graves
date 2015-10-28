

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
   * Mirror the map pan state.
   */
  _listenForMove() {
    this.context.map.on('move', this.setExtent.bind(this));
    this.setExtent();
  }


  /**
   * Mirror the map pan state.
   */
  setExtent() {

    let tl = this.context.map.containerPointToLatLng([
      0, 0
    ]);

    let br = this.context.map.containerPointToLatLng([
      $(window).width(),
      $(window).height()
    ]);

    let c1 = this.projection([tl.lng, tl.lat]);

    let c2 = this.projection([br.lng, br.lat]);

    this.extent.attr({
      x:      c1[0],
      y:      c1[1],
      height: c2[1]-c1[1],
      width:  c2[0]-c1[0],
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
