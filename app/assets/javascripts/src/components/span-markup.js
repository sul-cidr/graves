

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RadioComponent from '../lib/radio-component';
import * as actions from '../actions/counties';
import * as events from '../events/collections';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


@connect(null, actions)
export default class extends RadioComponent {


  static channelName = 'spans'


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
    this.spans = this.$el.find('span.burial');

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

    events.hoverCollection(e);

    let attrs = this.getAttrsFromEvent(e);
    events.highlightCollection(attrs.id);

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
    events.selectCollection(attrs.id);
  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {
    this.getBurialsById(id).addClass('highlight');
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.getBurialsById(id).removeClass('highlight');
  }


  // ** Helpers:


  /**
   * Get burial spans by id.
   *
   * @param {Number} id
   * @return {Object}
   */
  getBurialsById(id) {
    return this.$el.find(`span.burial[data-id=${id}]`)
  }


  /**
   * Get data attributes from an event.
   *
   * @param {Object} e
   * @returns {Object}
   */
  getAttrsFromEvent(e) {

    let span = $(e.currentTarget);

    return {
      id: Number(span.attr('data-id')),
      cdc: span.attr('data-cdc'),
    };

  }


}
