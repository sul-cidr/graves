

import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import RadioComponent from '../lib/radio-component';
import * as events from '../events/collections';
import * as actions from '../actions/collections';
import styles from './collection.yml';
import CollectionLayer from './collection-layer';
import CollectionHighlight from './collection-highlight';
import CollectionSelection from './collection-selection';
import CollectionOffsets from './collection-offsets';


@connect(
  state => ({
    features: state.collections.features
  }),
  actions
)
export default class extends RadioComponent {


  static channelName = 'collections'


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
      events.highlightCollection(e.layer.options.id);
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      events.unhighlightCollection(e.layer.options.id);
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

        <CollectionHighlight idToLayer={this.idToLayer} />
        <CollectionSelection idToLayer={this.idToLayer} />
        <CollectionOffsets idToLayer={this.idToLayer} />

      </span>
    );

  }


}
