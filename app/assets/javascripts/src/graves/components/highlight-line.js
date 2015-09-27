

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
    this.state = { span: null };
  }


  /**
   * Ensure that the move listener is removed.
   */
  componentWillUnmount() {
    super.componentWillUnmount();
    this.unbindMoveListener();
  }


  /**
   * Update the line when the map moves.
   */
  bindMoveListener() {
    getLeafletInstance().on('move', this.update, this);
  }


  /**
   * Remove the move listener.
   */
  unbindMoveListener() {
    getLeafletInstance().off('move', this.update, this);
  }


  /**
   * Cache the span position, show line.
   *
   * @param {Object} e
   */
  show(e) {
    this.setState({ span: $(e.target) });
    this.bindMoveListener();
  }


  /**
   * Re-render the line.
   */
  update() {
    this.forceUpdate();
  }


  /**
   * Hide the line.
   */
  hide() {
    this.setState({ span: false });
    this.unbindMoveListener();
  }


  /**
   * Render highlight line.
   */
  render() {

    let line = null;

    if (this.state.span) {

      let id      = this.state.span.attr('data-id');
      let offset  = this.state.span.offset();
      let height  = this.state.span.outerHeight();
      let width   = this.state.span.outerWidth();

      let top = offset.top - $(window).scrollTop();

      // Map offset.
      let [x2, y2] = getCollectionOffset(id);

      let padding = 5;

      // Text X.
      let x1 = x2 > offset.left ?
        offset.left + width + padding :
        offset.left - padding;

      // Text Y.
      let y1 = y2 > offset.top ?
        top + height - padding :
        top + padding;

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
