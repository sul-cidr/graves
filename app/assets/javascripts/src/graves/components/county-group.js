

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes, findDOMNode } from 'react';
import d3 from 'd3-browserify';

import GeometricGroup from './geometric-group';
import * as actions from '../actions/counties';


@connect(state => ({
  geojson: state.counties.geojson
}))
export default class extends GeometricGroup {


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
  componentDidUpdate() {

    // Render the counties.
    this.counties = this.g.selectAll('path')
      .data(this.props.geojson.features)
      .enter()
      .append('path')
      .classed({ county: true })
      .attr('d', this.path)

    let idMap = {};
    this.counties.each(function(f) {
      idMap[f.id] = d3.select(this);
    })

    // Register the id map.
    this.props.dispatch(actions.renderCounties(idMap));

    // HIGHLGHT
    this.counties.on('mouseover', c => {
      this.props.dispatch(actions.highlightCounty(c.id));
    });

    // UNHIGHLIGHT
    this.counties.on('mouseout', c => {
      this.props.dispatch(actions.unhighlightCounty(c.id));
    });

    super.componentDidUpdate();

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
