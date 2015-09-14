

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { loadProvinces } from '../actions/provinces';
import Province from './province';


@connect(state => (state.provinces))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Create the feature group, request provinces.
   */
  componentWillMount() {

    // Load provinces.
    this.props.dispatch(loadProvinces());

    // Create the top-level layer group.
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

    this.group.on('mouseover', e => {
      console.log(e);
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
