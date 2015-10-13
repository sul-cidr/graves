

import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import RadioComponent from '../lib/radio-component';
import * as events from '../events/collections';
import * as actions from '../actions/collections';
import CollectionLayer from './collection-layer';
import styles from './collection.yml';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  SELECT_COLLECTION,
  GET_COLLECTION_LON_LAT,
} from '../constants';


@connect(
  state => ({
    features: state.collections.features
  }),
  actions
)
export default class extends RadioComponent {


  static channelName = 'collections'


  static events = {
    collections: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
      [SELECT_COLLECTION]: 'select',
    }
  }


  static requests = {
    [GET_COLLECTION_LON_LAT]: 'getLonLat',
  }


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
        {features}
      </span>
    );

  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {

    let layer = this.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.hl);
    layer.openPopup();

  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {

    let layer = this.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.def);
    layer.closePopup();

  }


  /**
   * Zoom to the selected collection.
   *
   * @param {Number} id
   * @param {Number} zoom
   */
  select(id, zoom=8) {

    // Get a marker for the id.
    let layer = this.idToLayer[id];
    if (!layer) return;

    // Fly to the burial.
    this.context.map.flyTo(layer.getLatLng(), zoom);

  }


  /**
   * Get the lon/lat of a collection.
   *
   * @param {Number} id
   * @return {Array}
   */
  getLonLat(id) {
    let latLng = this.idToLayer[id].getLatLng();
    return [latLng.lng, latLng.lat];
  }


}
