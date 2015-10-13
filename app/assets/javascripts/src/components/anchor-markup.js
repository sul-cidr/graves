

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RadioComponent from '../lib/radio-component';
import * as actions from '../actions/counties';
import * as events from '../events/collections';
import { parseAttr } from '../utils';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


@connect(null, actions)
export default class extends RadioComponent {


  static channelName = 'collections'


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
    this.spans = this.$el.find('span.anchor');

    // Listen for cursor events.
    this.spans.on('mouseenter', this.onEnter.bind(this));
    this.spans.on('mouseleave', this.onLeave.bind(this));
    this.spans.on('click', this.onClick.bind(this));

  }


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.currentTarget);
    let id = parseAttr(span, 'data-id', Number);

    // Show the highlight line.
    let [lon, lat] = events.getCollectionLonLat(id);
    events.hoverCollection(span, lon, lat);

    // Publish the highlight.
    events.highlightCollection(id);

  }


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave(e) {
    let attrs = this.getAttrsFromEvent(e);
    events.unhighlightCollection(attrs.id);
  }


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let attrs = this.getAttrsFromEvent(e);

    // Select the collection.
    if (attrs.id) {
      events.selectCollection(attrs.id, attrs.zoom);
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
    return this.$el.find(`span.anchor[data-id=${id}]`)
  }


  /**
   * Get data attributes from an event.
   *
   * @param {Object} e
   * @returns {Object}
   */
  getAttrsFromEvent(e) {

    let span = $(e.currentTarget);

    let id    = parseAttr(span, 'data-id', Number);
    let zoom  = parseAttr(span, 'data-zoom', Number);
    let cdc   = parseAttr(span, 'data-cdc');

    return {
      id, zoom, cdc
    };

  }


}
