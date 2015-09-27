

import $ from 'jquery';
import React from 'react';
import RadioComponent from '../lib/radio-component';

import {
  HOVER_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'highlight-line'


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
   * Cache the span position, show line.
   *
   * @param {Object} e
   */
  show(e) {

    this.span   = $(e.target);
    this.id     = this.span.attr('data-id');
    this.offset = this.span.offset();
    this.height = this.span.outerHeight();
    this.width  = this.span.outerWidth();

    this.setState({ visible: true });

  }


  /**
   * Hide the line.
   */
  hide() {
    this.setState({ visible: false });
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
