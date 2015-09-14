

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/collections';
import Collection from './collection';


@connect(state => (state.provinces))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Create the feature group, request collections.
   */
  componentWillMount() {

    // Create group.
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

    // Request provinces.
    this.props.dispatch(actions.loadCollections());

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {

      return (
        <Collection
          key={f.id}
          group={this.group}
          feature={f}
        />
      );

    });

    return (
      <noscript className="collections">
        {features}
      </noscript>
    );

  }


}
