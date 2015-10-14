

import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { parseAttr, parseLonLat } from '../utils';
import * as actions from '../actions/counties';


@connect(null, actions)
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

    let attrs = this.getAttrsFromEvent(e);

    if (attrs.cdc) {
      this.props.showChoropleth(attrs.cdc);
    }

  }


  /**
   * Get data attributes from an event.
   *
   * @param {Object} e
   * @returns {Object}
   */
  getAttrsFromEvent(e) {

    let span = $(e.currentTarget);

    let focus = parseAttr(span, 'data-focus', parseLonLat);
    let zoom  = parseAttr(span, 'data-zoom', Number);
    let cdc   = parseAttr(span, 'data-cdc');

    return {
      focus, zoom, cdc
    };

  }


  render() {
    return null;
  }


}
