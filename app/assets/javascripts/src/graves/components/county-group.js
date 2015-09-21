

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes, findDOMNode } from 'react';
import d3 from 'd3-browserify';
import * as actions from '../actions/counties';
import CountyLayer from './county-layer';


@connect(state => ({
  features: state.counties.features
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Inject the d3 container, request counties.
   */
  componentDidMount() {

    // Append the SVG container into Leaflet.
    let svg = findDOMNode(this.refs.svg);
    this.context.map.getPanes().overlayPane.appendChild(svg);

    this.props.dispatch(actions.loadCounties());

  }


  /**
   * Render counties.
   */
  componentDidUpdate() {

    // TODO|dev

    let g = d3.select(findDOMNode(this.refs.g));
    let svg = d3.select(findDOMNode(this.refs.svg));
    let map = this.context.map;

    // Make GeoJSON collection.
    // TODO: Pre-format this?

    let collection = {
      type: 'FeatureCollection'
    };

    collection.features = this.props.features.map(f => {
      return {
        type: 'Feature',
        geometry: JSON.parse(f.geojson),
      };
    });

    let transform = d3.geo.transform({
      point: function(x, y) {
        let latlng = new L.LatLng(x, y);
        let point = map.project(latlng)._subtract(map.getPixelOrigin());
        this.stream.point(point.x, point.y);
      }
    });

    let path = d3.geo.path().projection(transform);

    let counties = d3.select(findDOMNode(this.refs.g))
      .selectAll('path')
      .data(collection.features)
      .enter()
      .append('path');

    var first = true, inittl, initbr, oldtl, oldbr;

    let reset = () => {

      let bounds = d3.geo.path().projection(null).bounds(collection);
      let tl = map.latLngToLayerPoint([bounds[0][0], bounds[0][1]]);
      let br = map.latLngToLayerPoint([bounds[1][0], bounds[1][1]]);

      svg
        .attr('width', br.x-tl.x)
        .attr('height', tl.y-br.y)
        .style('left', `${tl.x}px`)
        .style('top', `${br.y}px`);

      if (first) {

        g.attr('transform', `translate(${-tl.x},${-br.y})`);
        counties.attr('d', path);

        first = false;
        inittl = tl;
        initbr = br;

      }

      else {

        let trans = d3.transform(g.attr('transform'));
        let oldScale = trans.scale;

        trans.scale = [
          oldScale[0] * ((br.x - tl.x) / (oldbr.x - oldtl.x)),
          oldScale[1] * ((tl.y - br.y) / (oldtl.y - oldbr.y)),
        ];

        trans.translate = [-inittl.x, -initbr.y];

        g.attr('transform', `scale(${trans.scale[0]},${trans.scale[1]})translate(${trans.translate[0]},${trans.translate[1]})`);

      }

      oldtl = tl;
      oldbr = br;

    }

    map.on('viewreset', reset);
    reset();

  }


  /**
   * Render d3-controlled paths.
   */
  render() {
    return (
      <svg ref="svg">
        <g ref="g"></g>
      </svg>
    );
  }


}
