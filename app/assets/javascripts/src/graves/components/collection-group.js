

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/collections';
import CollectionLayer from './collection-layer';
import styles from './collection.yml';


@connect(state => ({
  features: state.collections.features
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
   * Initialize the feature group and id map.
   */
  componentWillMount() {

    this.idMap = {};

    // Create group.
    this.group = L.featureGroup();

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.dispatch(actions.highlightCollection(
        e.layer.options.id
      ));
    });

    // SELECT
    this.group.on('click', e => {
      this.props.dispatch(actions.selectCollection(
        e.layer.options.id
      ));
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.dispatch(actions.unhighlightCollection());
    });

    // Add to the map.
    this.group.addTo(this.context.map);
    this.group.bringToFront();

  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.dispatch(actions.loadCollections());
  }


  /**
   * Publish the id -> layer map to the store.
   */
  componentDidUpdate() {
    this.props.dispatch(actions.renderCollections(this.idMap));
  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {

      // Filter out un-geocoded collections.
      if (!f.geojson) return;

      return (
        <CollectionLayer
          key={f.id}
          group={this.group}
          idMap={this.idMap}
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