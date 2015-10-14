

import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { parseAttr } from '../utils';


export default class extends Component {


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
   * When the cursor enters an anchor.
   *
   * @param {Object} e
   */
  onEnter(e) {
    // TODO
    console.log('enter');
  }


  /**
   * When the cursor leaves an anchor.
   *
   * @param {Object} e
   */
  onLeave(e) {
    // TODO
    console.log('leave');
  }


  /**
   * When an anchor is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {
    // TODO
    console.log('click');
  }


  render() {
    return null;
  }


}
