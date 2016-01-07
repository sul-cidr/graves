

import L from 'leaflet';
import d3 from 'd3';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';
import CountyChoropleth from './county-choropleth';
import * as actions from '../actions/counties';


@connect(
  state => ({
    geojson: state.counties.geojson
  }),
  actions
)
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  };


  static propTypes = {
    geojson: PropTypes.any,
  };


  /**
   * Inject the d3 rig.
   */
  componentWillMount() {

    let map = this.context.map;

    // SVG container.
    let pane = map.getPanes().overlayPane;
    this.svg = d3.select(pane).append('svg');

    // Layer group.
    this.g = this.svg.append('g').classed({
      counties: true,
      'leaflet-zoom-hide': true,
    });

    let origin = map.getPixelOrigin();

    // Map lon/lat -> layer pixels.
    let transform = d3.geo.transform({
      point: function(x, y) {
        let point = map.project(new L.LatLng(x, y))._subtract(origin);
        this.stream.point(point.x, point.y);
      }
    });

    this.path = d3.geo.path().projection(transform);

    // Scale geometry on zoom.
    map.on('zoom', this.scale.bind(this, false));

    // Hide during move.
    map.on('movestart', () => {
      this.g.classed('hide', true);
    });

    // Show after move.
    map.on('moveend', () => {
      this.g.classed('hide', false);
    });

  }


  /**
   * Request counties.
   */
  componentDidMount() {
    this.props.loadCounties();
  }


  /**
   * Cache the GeoJSON bounds, initial sync.
   *
   * @param {Object} props
   */
  componentWillUpdate(props) {

    // Render the counties.
    this.counties = this.g.selectAll('path')
      .data(props.geojson.features)
      .enter()
      .append('path')
      .classed({ county: true })
      .attr('d', this.path);

    // Initial scale.
    this.bounds = d3.geo.path().projection(null).bounds(props.geojson);
    this.scale(true);

    // HIGHLGHT
    this.counties.on('mouseover', function() {
      d3.select(this).classed('highlight', true);
    });

    // UNHIGHLGHT
    this.counties.on('mouseout', function() {
      d3.select(this).classed('highlight', false);
    });

  }


  /**
   * Sync the counties with the map.
   *
   * @param {Boolean} first
   */
  scale(first) {

    if (!this.bounds) return;

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
   * Apply choropleths.
   */
  render() {

    // Pass down the GeoJSON to force an update on new counties.
    return <CountyChoropleth
      g={this.g}
      geojson={this.props.geojson}
    />;

  }


}
