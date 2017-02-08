

import _ from 'lodash';
import $ from 'jquery';
import L from 'leaflet';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import rbush from 'rbush';

import * as actions from '../actions/collections';
import * as events from '../events/collections';

import { countToRadius } from './collection-scale';
import Component from './component';
import FilterDates from './filter-dates';
import FilterTags from './filter-tags';
import ClearFilters from './clear-filters';


import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
  GET_COLLECTION_LON_LAT,
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
    },
  };


  static requests = {
    [COLLECTIONS]: {
      [GET_COLLECTION_LON_LAT]: 'getLonLat',
    }
  }


  static propTypes = {
    map: PropTypes.object.isRequired,
    geojson: PropTypes.object,
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
      let localItems = this.tree.search(this.toRbushTreeItem(e.layer));
      let localMarkers = localItems.map((item) => this.idToMarker[item.id]);
      this.props.selectCollection(e.layer.options.feature, localMarkers);
    });

    window.markers = this;

  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.loadCollections();
  }


  /**
   * Render collection markers.
   */
  componentDidUpdate() {
    this.tree = rbush();

    if (this.props.geojson) {

      // Clear existing markers.
      this.group.clearLayers();

      _.each(this.props.geojson.features, f => {

        let date = moment(f.properties.notice.deadline);

        let cx = classNames('collection', {
          nocount: !f.properties.num_graves,
        });

        let marker = L.circleMarker(f.geometry.coordinates, {
          feature: f,
          className: cx,
          date,
        });

        // Size by grave count.
        let r = countToRadius(f.properties.num_graves);
        marker.setRadius(r);

        // Insert the item representation to the rtree
        let item = this.toRbushTreeItem(marker);
        this.tree.insert(item);

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
   * Get the lon/lat of a collection.
   *
   * @param {Number} id
   * @return {Array}
   */
  getLonLat(id) {
    let latLng = this.idToMarker[id].getLatLng();
    return [latLng.lng, latLng.lat];
  }

  /**
   * Calculate in projected space a bounding envelope of the circle using radius
   *
   * @param {L.marker} marker
   * @return {Object}
   */
  toRbushTreeItem(marker) {
    let r = marker.getRadius();
    let projected = this.props.map.project(marker.getLatLng());
    let unprojectedBounds = L.bounds(
      L.point(projected.x - r, projected.y - r), L.point(projected.x + r, projected.y + r)
    );
    let bounds = L.latLngBounds(
      this.props.map.unproject(unprojectedBounds.min), this.props.map.unproject(unprojectedBounds.max)
    );

    return {
      minX: bounds.getWest(),
      minY: bounds.getSouth(),
      maxX: bounds.getEast(),
      maxY: bounds.getNorth(),
      id: marker.options.feature.id
    };
  }


  /**
   * Render the filters.
   */
  render() {
    return (
      <behaviors>

        <FilterDates
          idToMarker={this.idToMarker}
          group={this.group}
        />

        <FilterTags
          idToMarker={this.idToMarker}
          group={this.group}
        />

        <ClearFilters
          idToMarker={this.idToMarker}
          group={this.group}
        />

      </behaviors>
    );
  }


}
