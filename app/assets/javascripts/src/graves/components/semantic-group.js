

import L from 'leaflet';
import React, { Component, PropTypes } from 'react';
import d3 from 'd3-browserify';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    geojson: PropTypes.object.isRequired,
  }


  /**
   * Inject the d3 rig.
   */
  componentWillMount() {

    let map = this.context.map;

    // SVG container.
    let pane = map.getPanes().overlayPane;
    this.svg = d3.select(pane).append('svg');

    // Layer group.
    this.g = this.svg.append('g')
      .classed('leaflet-zoom-hide', true);

    // Map lon/lat -> layer pixels.
    let transform = d3.geo.transform({
      point: function(x, y) {
        let point = map.latLngToLayerPoint(new L.LatLng(x, y));
        this.stream.point(point.x, point.y);
      }
    });

    this.path = d3.geo.path().projection(transform);

    // Sync geometry when the map zooms.
    this.context.map.on(
      'viewreset',
      this.sync.bind(this)
    );

  }


  /**
   * Cache the GeoJSON bounds, initial sync.
   *
   * @param {Object} props
   */
  componentWillUpdate(props) {
    this.bounds = d3.geo.path().projection(null).bounds(props.geojson);
    this.sync();
  }


  /**
   * Sync the counties with the map.
   */
  sync() {

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

    // Set the <g> offset.
    this.g.attr('transform', `translate(${-tl.x},${-br.y})`);

  }


  /**
   * Render d3-controlled paths.
   */
  render() {
    return null;
  }


}
