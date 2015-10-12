

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RadioComponent from '../lib/radio-component';
import { parseAttr, parseLonLat } from '../utils';
import * as events from '../events/anchors';
import * as actions from '../actions/counties';


@connect(null, actions)
export default class extends RadioComponent {


  static channelName = 'anchors'


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
    // TODO
  }


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave(e) {
    // TODO
  }


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let attrs = this.getAttrsFromEvent(e);

    // Focus on the anchor.
    if (attrs.focus) {
      events.selectAnchor(attrs.focus, attrs.zoom);
    }

    // Update the choropleth.
    if (attrs.cdc) {
      this.props.showChoropleth(attrs.cdc);
    }

  }


  // ** Helpers:


  /**
   * Get data attributes from an event.
   *
   * @param {Object} e
   * @returns {Object}
   */
  getAttrsFromEvent(e) {

    let span = $(e.currentTarget);

    let zoom  = parseAttr(span, 'data-zoom', Number);
    let focus = parseAttr(span, 'data-focus', parseLonLat);
    let cdc   = parseAttr(span, 'data-cdc');

    return {
      focus, zoom, cdc
    };

  }


}
