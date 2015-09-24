

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import * as actions from '../actions/collections';
import styles from './collection.yml';
import CollectionHighlight from './collection-highlight';
import CollectionLayer from './collection-layer';


@connect(
  state => ({
    features: state.collections.features
  }),
  actions
)
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    features: PropTypes.array.isRequired,
  }


  /**
   * Initialize the feature group and id map.
   */
  componentWillMount() {

    this.idToLayer = {};

    // Create group.
    this.group = L.featureGroup();

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.highlightCollection(e.layer.options.id);
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.unhighlightCollection();
    });

    // Add to the map.
    this.group.addTo(this.context.map);

  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.loadCollections();
  }


  /**
   * Ensure the collections are on top.
   */
  componentDidUpdate() {
    this.group.bringToFront();
  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {
      return (
        <CollectionLayer
          key={f.id}
          group={this.group}
          idToLayer={this.idToLayer}
          feature={f}
        />
      );
    });

    return (
      <span className="collections">

        <span>
          {features}
        </span>

        <CollectionHighlight
          idToLayer={this.idToLayer}
        />

      </span>
    );

  }


}
