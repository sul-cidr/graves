

import $ from 'jquery';
import React from 'react';
import RadioComponent from '../lib/radio-component';
import { getLeafletInstance } from '../events/map';
import { getCollectionOffset } from '../events/collections';

import {
  HOVER_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'spans'


  static events = {
    collections: {
      HOVER_COLLECTION: 'show',
      UNHIGHLIGHT_COLLECTION: 'hide',
    }
  }


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);
    this.state = { id: null };

    // Map move callback.
    this.update = this.forceUpdate.bind(this, null);

  }


  /**
   * Update the line when the map moves.
   */
  bindMoveListener() {
    getLeafletInstance().on('move', this.update);
  }


  /**
   * Remove the move listener.
   */
  unbindMoveListener() {
    getLeafletInstance().off('move', this.update);
  }


  /**
   * Cache the span position, show line.
   *
   * @param {Object} e
   */
  show(e) {

    let span    = $(e.target);
    let id      = span.attr('data-id');
    let offset  = span.offset();
    let height  = span.outerHeight();
    let width   = span.outerWidth();
    let top     = offset.top - $(window).scrollTop();

    this.setState({
      id, offset, width, height, top,
    });

    this.bindMoveListener();

  }


  /**
   * Remove the line, move listener.
   */
  hide() {
    this.setState({ id: null });
    this.unbindMoveListener();
  }


  /**
   * Ensure move listener is removed.
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.unbindMoveListener();
  }


  /**
   * Render highlight line.
   */
  render() {

    let line = null;

    if (this.state.id) {

      // Map offset.
      let [x2, y2] = getCollectionOffset(this.state.id);

      let padding = 5;

      // Text X.
      let x1 = x2 > this.state.offset.left ?
        this.state.offset.left + this.state.width + padding :
        this.state.offset.left - padding;

      // Text Y.
      let y1 = this.state.top + padding;

      line = <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />;

    }

    return (
      <svg className="highlight-line">
        {line}
      </svg>
    );

  }


}
