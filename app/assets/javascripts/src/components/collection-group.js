

import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import CollectionLayer from './collection-layer';
import * as actions from '../actions/collections';
import styles from './collection.yml';

import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  GET_COLLECTION_LON_LAT,
} from '../constants';

import {
  highlightCollection,
  unhighlightCollection,
} from '../events/collections';


@connect(
  state => ({
    features: state.collections.features
  }),
  actions
)
export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
    }
  }


  static requests = {
    [COLLECTIONS]: {
      [GET_COLLECTION_LON_LAT]: 'getLonLat',
    }
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
    this.group.addTo(this.context.map);

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      highlightCollection(e.layer.options.id);
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      unhighlightCollection(e.layer.options.id);
    });

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
