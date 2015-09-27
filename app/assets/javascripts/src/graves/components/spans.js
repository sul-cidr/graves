

import $ from 'jquery';
import React, { Component, PropTypes, findDOMNode } from 'react';
import RadioComponent from '../lib/radio-component';
import * as events from '../events/collections';
import * as actions from '../actions/collections';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'spans'


  static events = {
    collections: {
      HIGHLIGHT_COLLECTION: 'highlight',
      UNHIGHLIGHT_COLLECTION: 'unhighlight',
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

    let id = this.getBurialIdFromEvent(e);
    events.highlightCollection(id);

  }


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave(e) {
    let id = this.getBurialIdFromEvent(e);
    events.unhighlightCollection(id);
  }


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {
    let id = this.getBurialIdFromEvent(e);
    events.selectCollection(id);
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
   * Get a burial ID from a cursor event.
   *
   * @param {Object} e
   * @returns {Number}
   */
  getBurialIdFromEvent(e) {
    return Number($(e.currentTarget).attr('data-id'));
  }


}
