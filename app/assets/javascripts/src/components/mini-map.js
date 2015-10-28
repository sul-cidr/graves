

import $ from 'jquery';
import d3 from 'd3-browserify';
import React from 'react';
import { findDOMNode } from 'react-dom';
import Component from './component';

import chinaJSON from '../data/CHN.geo.json';


export default class extends Component {


  /**
   * Draw China, inject extent box.
   */
  componentDidMount() {

    this.svg = d3.select(findDOMNode(this));

    this._plotChina();
    this._addMarkup();

  }


  /**
   * Plot the Chinese borders.
   */
  _plotChina() {

    let bbox = this.svg.node().getBBox();

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
   * Render mini map container.
   */
  render() {
    return (
      <svg id="mini-map">
      </svg>
    );
  }


}
