

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/provinces';
import Province from './province';


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

    // Load provinces, create group.
    this.props.dispatch(actions.loadProvinces());
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      let id = e.layer.options.id;
      this.props.dispatch(actions.highlightProvince(id));
    });

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {
      return (
        <Province
          key={f.id}
          group={this.group}
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
