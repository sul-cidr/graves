

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as mapActions from '../actions/map';
import * as timeSliderActions from '../actions/time-slider';
import * as filterActions from '../actions/filters';
import * as utils from '../utils';
import * as events from '../events/collections';

import Component from './component';


import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';

import {
  highlightCollection,
  unhighlightCollection,
  getCollectionLonLat,
} from '../events/collections';

import {
  showMapLine,
  hideMapLine,
  focusMap,
} from '../events/map';

import {
  setTimeSliderRange,
} from '../events/time-slider';


@connect(null, dispatch => {

  return bindActionCreators({
    ...mapActions,
    ...timeSliderActions,
    ...filterActions,
  }, dispatch);

})
export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
    }
  };


  static propTypes = {
    container: PropTypes.object.isRequired,
    changeBaseLayer: PropTypes.func.isRequired,
    toggleTimeSlider: PropTypes.func.isRequired,
    setTagFilter: PropTypes.func.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.collections = this.props.container.find('.collection');

    this.collections
      .mouseenter(this.onEnter.bind(this))
      .mouseleave(this.onLeave.bind(this))
      .click(this.onClick.bind(this));

  }


  /**
   * When the cursor enters a collection.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.target);

    let { id } = utils.parseAttrs(span, {
      id: ['data-id', Number],
    });

    if (id) {

      // Show the highlight line.
      let [lon, lat] = getCollectionLonLat(id);
      showMapLine(span, lon, lat);

      // Publish highlight.
      highlightCollection(id);

    }

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let span = $(e.target);

    let { id } = utils.parseAttrs(span, {
      id: ['data-id', Number]
    });

    if (id) {

      // Remove the map line.
      hideMapLine();

      // Publish unhighlight.
      unhighlightCollection(id);

    }

  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let span = $(e.target);

    let attrs = utils.parseAttrs(span, {

      id:             ['data-id', Number],
      tags:           ['data-tags', utils.parseTags],
      zoom:           ['data-zoom', Number],

      wmsLayerSlug:   'data-wms-layer',
      baseLayerSlug:  'data-base-layer',
      start:          'data-start',
      end:            'data-end',
      choropleth:     'data-choropleth',

    });

    // Focus the map.
    if (attrs.id) {
      let [lon, lat] = getCollectionLonLat(attrs.id);
      focusMap(lon, lat, attrs.zoom);
    }

    // Set the base layer.
    if (attrs.baseLayerSlug) {
      this.props.changeBaseLayer(attrs.baseLayerSlug);
    }

    // Set the WMS layer.
    if (attrs.wmsLayerSlug || attrs.wmsLayerSlug === "") {
      this.props.changeWmsLayer(attrs.wmsLayerSlug);
    }

    // Set the choropleth.
    if (attrs.choropleth || attrs.choropleth === "") {
      this.props.changeChoropleth(attrs.choropleth);
    }

    // Set the date range.
    if (attrs.start && attrs.end) {
      this.props.toggleTimeSlider(true);
      setTimeSliderRange(attrs.start, attrs.end);
    }

    // Set the tag filter.
    if (attrs.tags) {
      this.props.setTagFilter(attrs.tags);
    }

    // Prevent the click from triggering a section focus.
    e.stopPropagation();

  }


  /**
   * Get collection spans by id.
   *
   * @param {Number} id
   * @return {DOMElement}
   */
  getAnchorsById(id) {
    return this.props.container.find(`.collection[data-id=${id}]`)
  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {
    this.getAnchorsById(id).addClass('highlight');
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.getAnchorsById(id).removeClass('highlight');
  }


}
