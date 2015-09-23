

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes, findDOMNode } from 'react';
import d3 from 'd3-browserify';
import * as actions from '../actions/counties';


@connect(state => ({
  geojson: state.counties.geojson
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    geojson: PropTypes.object.isRequired,
  }


  /**
   * Inject the d3 rig.
   */
  componentWillMount() {

    // Get Leaflet overlay pane.
    let pane = this.context.map.getPanes().overlayPane;

    // Top-level SVG.
    this.svg = d3.select(pane).append('svg');

    // County wrapper.
    this.g = this.svg.append('g').classed('leaflet-zoom-hide', true);

  }


  /**
   * Inject the d3 rig.
   */
  componentDidUpdate() {

    let map = this.context.map;
    let origin = map.getPixelOrigin();

    // Map lon/lat -> layer pixels.
    let transform = d3.geo.transform({
      point: function(x, y) {
        let point = map.project(new L.LatLng(x, y))._subtract(origin);
        this.stream.point(point.x, point.y);
      }
    });

    // Path generator.
    this.path = d3.geo.path().projection(transform);

    // Inject <path>'s.
    this.counties = this.g
      .selectAll('path')
      .data(this.props.geojson.features)
      .enter()
      .append('path')
      .classed({ county: true });

    this.bounds = d3.geo.path()
      .projection(null)
      .bounds(this.props.geojson);

    // Sync <paths> with map.
    map.on('viewreset', this.sync.bind(this, false));
    this.sync(true);

  }


  /**
   * Sync the counties with the map.
   *
   * @param {Boolean} first
   */
  sync(first) {

    // Top right.
    let tl = this.context.map.latLngToLayerPoint([
      this.bounds[0][0],
      this.bounds[0][1],
    ]);

    // Bottom left.
    let br = this.context.map.latLngToLayerPoint([
      this.bounds[1][0],
      this.bounds[1][1],
    ]);

    // Position the container.
    this.svg
      .attr('width', br.x-tl.x)
      .attr('height', tl.y-br.y)
      .style('top', `${br.y}px`)
      .style('left', `${tl.x}px`);

    if (first) {

      // Set the initial <g> offset.
      this.g.attr('transform', `translate(${-tl.x},${-br.y})`);
      this.counties.attr('d', this.path);

      // Cache the starting corners.
      this.tl0 = tl;
      this.br0 = br;

    }

    else {

      let t = d3.transform(this.g.attr('transform'));

      // Scale to match zoom level.
      t.scale = [
        t.scale[0] * ((br.x - tl.x) / (this.br.x - this.tl.x)),
        t.scale[1] * ((tl.y - br.y) / (this.tl.y - this.br.y)),
      ];

      t.translate = [-this.tl0.x, -this.br0.y];

      let scale = `scale(${t.scale.join()})`;
      let translate = `translate(${t.translate.join()})`;
      this.g.attr('transform', scale+translate);

    }

    // Cache the current corners.
    this.tl = tl;
    this.br = br;

  }


  /**
   * Request counties.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadCounties());
  }


  /**
   * Render d3-controlled paths.
   */
  render() {
    return null;
  }


}
