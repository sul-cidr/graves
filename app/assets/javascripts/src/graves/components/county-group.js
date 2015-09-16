

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/provinces';
import CountyLayer from './county-layer';


@connect(state => ({
  features: state.provinces.features
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
   * Create the feature group, request provinces.
   */
  componentWillMount() {

    this.idMap = {};

    // Create group.
    this.group = L.featureGroup();

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.dispatch(actions.highlightProvince(
        e.layer.options.id
      ));
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.dispatch(actions.unhighlightProvince());
    });

    // Add to the map.
    this.group.addTo(this.context.map);
    this.group.bringToBack();

  }


  /**
   * Request provinces.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadProvinces());
  }


  /**
   * Publish the id -> layer map to the store.
   */
  componentDidUpdate() {
    this.props.dispatch(actions.renderProvinces(this.idMap));
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
      <noscript className="provinces">
        {features}
      </noscript>
    );

  }


}
