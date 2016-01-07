

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import { parseAttrs, parseLonLat } from '../utils';
import * as actions from '../actions/counties';

import {
  showMapLine,
  hideMapLine,
  focusMap,
} from '../events/map';


@connect(null, actions)
export default class extends Component {


  static propTypes = {
    markup: PropTypes.object.isRequired,
  };


  /**
   * Wrap the markup container.
   */
  componentDidMount() {

    this.$el = $(this.props.markup);
    this.spans = this.$el.find('span.anchor');

    // Listen for cursor events.
    this.spans
      .on('mouseenter', this.onEnter.bind(this))
      .on('mouseleave', this.onLeave.bind(this))
      .on('click', this.onClick.bind(this));

  }


  /**
   * When the cursor enters an anchor.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.target);

    let attrs = parseAttrs(span, {
      focus: ['data-focus', parseLonLat]
    });

    // Show the highlight line.
    if (attrs.focus) {
      let [lon, lat] = attrs.focus;
      showMapLine(span, lon, lat);
    }

    span.addClass('highlight');

  }


  /**
   * When the cursor leaves an anchor.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let span = $(e.target);

    hideMapLine();
    span.removeClass('highlight');

  }


  /**
   * When an anchor is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let attrs = parseAttrs($(e.target), {
      zoom:   ['data-zoom', Number],
      focus:  ['data-focus', parseLonLat],
      cdc:    'data-cdc',
    });

    // Focus the map.
    if (attrs.focus) {
      let [lon, lat] = attrs.focus;
      focusMap(lon, lat, attrs.zoom);
    }

    // Update the choropleth.
    if (attrs.cdc) {
      this.props.showChoropleth(attrs.cdc);
    }

  }


}
