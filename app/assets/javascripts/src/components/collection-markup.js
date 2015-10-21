

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Component from './component';
import * as actions from '../actions/counties';
import { parseAttr } from '../utils';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';

import {
  highlightCollection,
  unhighlightCollection,
  getCollectionLonLat,
} from '../events/collections';

import {
  focusMap,
} from '../events/map';

import {
  showHighlightLine,
  hideHighlightLine,
} from '../events/narrative';


@connect(null, actions)
export default class extends Component {


  static events = {
    collections: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
    }
  }


  static propTypes = {
    markup: PropTypes.object.isRequired,
  }


  /**
   * Wrap the markup container.
   */
  componentDidMount() {

    this.$el = $(this.props.markup);
    this.spans = this.$el.find('span.collection');

    // Listen for cursor events.
    this.spans
      .on('mouseenter', this.onEnter.bind(this))
      .on('mouseleave', this.onLeave.bind(this))
      .on('click', this.onClick.bind(this));

  }


  /**
   * When the cursor enters a collection.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.target);
    let attrs = this.getAttrsFromEvent(e);

    // Show the highlight line.
    let [lon, lat] = getCollectionLonLat(attrs.id);
    showHighlightLine(span, lon, lat);

    // Publish highlight.
    highlightCollection(attrs.id);

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {

    hideHighlightLine();

    // Publish unhighlight.
    let attrs = this.getAttrsFromEvent(e);
    unhighlightCollection(attrs.id);

  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let attrs = this.getAttrsFromEvent(e);

    // Focus the map.
    if (attrs.id) {
      let [lon, lat] = getCollectionLonLat(attrs.id);
      focusMap(lon, lat, attrs.zoom);
    }

    // Update the choropleth.
    if (attrs.cdc) {
      this.props.showChoropleth(attrs.cdc);
    }

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


  // ** Helpers:


  /**
   * Get collection spans by id.
   *
   * @param {Number} id
   * @return {Object}
   */
  getAnchorsById(id) {
    return this.$el.find(`span.collection[data-id=${id}]`)
  }


  /**
   * Get data attributes from an event.
   *
   * @param {Object} e
   * @returns {Object}
   */
  getAttrsFromEvent(e) {

    let span = $(e.target);

    let id    = parseAttr(span, 'data-id', Number);
    let zoom  = parseAttr(span, 'data-zoom', Number);
    let cdc   = parseAttr(span, 'data-cdc');

    return {
      id, zoom, cdc
    };

  }


}
