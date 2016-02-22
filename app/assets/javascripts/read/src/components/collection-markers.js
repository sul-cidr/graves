

import _ from 'lodash';
import $ from 'jquery';
import L from 'leaflet';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as events from '../events/collections';
import * as actions from '../actions/collections';

import Component from './component';
import scale from './collection-scale';

import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  ZOOM_TO_COLLECTION,
} from '../constants';


@connect(
  state => ({
    geojson: state.collections.geojson
  }),
  actions,
)
export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
      [ZOOM_TO_COLLECTION]: 'zoom',
    }
  };


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Initialize the feature group and ID map.
   */
  componentWillMount() {

    this.idToMarker = {};

    // Create a group for the markers.
    this.group = L.featureGroup();
    this.group.addTo(this.props.map);

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      events.highlightCollection(e.layer.options.feature.id);
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      events.unhighlightCollection(e.layer.options.feature.id);
    });

    // SELECT
    this.group.on('click', e => {
      this.props.selectCollection(e.layer.options.feature);
    });

    window.markers = this;

  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.loadCollections();
  }


  render() {

    if (this.props.geojson) {

      // Clear existing markers.
      this.group.clearLayers();

      _.each(this.props.geojson.features, f => {

        let cx = classNames('collection', {
          nocount: !f.properties.num_graves,
        });

        let marker = L.circleMarker(f.geometry.coordinates, {
          feature: f,
          className: cx,
        });

        // Size by grave count.
        let r = scale(f.properties.num_graves || 7);
        marker.setRadius(r);

        let label = (
          f.properties.town_p ||
          f.properties.county_p ||
          f.properties.province_p
        );

        // Attach popup.
        marker.bindPopup(label, {
          minWidth: 0,
          closeButton: false,
          autoPan: false,
        });

        this.idToMarker[f.id] = marker;
        this.group.addLayer(marker);

      });

    }

    return null;

  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {

    let marker = this.idToMarker[id];
    if (!marker) return;

    $(marker._path).addClass('highlight');
    marker.openPopup();

  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {

    let marker = this.idToMarker[id];
    if (!marker) return;

    $(marker._path).removeClass('highlight');
    marker.closePopup();

  }


  /**
   * Focus on a collection.
   *
   * @param {Number} id
   * @param {Number} zoom
   */
  zoom(id, zoom=8) {

    let marker = this.idToMarker[id];
    if (!marker) return;

    this.props.map.flyTo(marker.getLatLng(), zoom, {
      duration: 1.5
    });

  }


}
