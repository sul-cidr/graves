

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
    this.state = { visible: false };
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

    let span = $(e.target);

    // get size / position.

    this.setState({ visible: true });
    this.bindMoveListener();

  }


  /**
   * Set the marker offset.
   */
  update() {
    // TODO
  }


  /**
   * Hide the line.
   */
  hide() {
    this.setState({ visible: false });
    this.unbindMoveListener();
  }


  /**
   * Render highlight line.
   */
  render() {

    let line = null;

    if (this.state.visible) {
      line = <line />
    }

    return (
      <svg className="highlight-line">
        {line}
      </svg>
    );

  }


}
