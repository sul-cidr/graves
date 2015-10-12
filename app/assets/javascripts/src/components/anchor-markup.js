

import $ from 'jquery';
import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';


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
    console.log('enter');
  }


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave(e) {
    // TODO
    console.log('leave');
  }


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {
    // TODO
    console.log('click');
  }


}
