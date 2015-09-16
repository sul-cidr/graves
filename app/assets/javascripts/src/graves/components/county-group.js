

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
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
   * Create the feature group, request counties.
   */
  componentWillMount() {

    this.idMap = {};

    // Create group.
    this.group = L.featureGroup();

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.dispatch(actions.highlightCounty(
        e.layer.options.id
      ));
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.dispatch(actions.unhighlightCounty());
    });

    // Add to the map.
    this.group.addTo(this.context.map);
    this.group.bringToBack();

  }


  /**
   * Request counties.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadCounties());
  }


  /**
   * Publish the id -> layer map to the store.
   */
  componentDidUpdate() {
    this.props.dispatch(actions.renderCounties(this.idMap));
  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {
      return (
        <CountyLayer
          key={f.id}
          group={this.group}
          idMap={this.idMap}
          feature={f}
        />
      );
    });

    return (
      <noscript className="counties">
        {features}
      </noscript>
    );

  }


}
