

import $ from 'jquery';
import React, { Component, PropTypes, findDOMNode } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/collections';


@connect(
  state => ({
    highlighted: state.collections.highlighted,
  }),
  actions
)
export default class extends Component {


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
   * Manifest the highlighted collection.
   *
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {

    // Highlight.
    if (!prevProps.highlighted && this.props.highlighted) {
      this.highlight(this.props.highlighted);
    }

    // Unhighlight.
    else if (prevProps.highlighted && !this.props.highlighted) {
      this.unhighlight(prevProps.highlighted);
    }

  }


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onEnter(e) {
    let id = this.getBurialIdFromEvent(e);
    this.props.highlightCollection(id);
  }


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave(e) {
    let id = this.getBurialIdFromEvent(e);
    this.props.unhighlightCollection(id);
  }


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {
    // TODO
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


  render() {
    return null;
  }


}
