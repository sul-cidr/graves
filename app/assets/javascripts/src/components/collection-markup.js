

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import * as actions from '../actions/counties';
import { parseAttrs } from '../utils';

import {
  COLLECTIONS,
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';

import {
  highlightCollection,
  unhighlightCollection,
  getCollectionLonLat,
} from '../events/collections';

import {
  focusMap,
} from '../events/map';

import {
  showHighlightLine,
  hideHighlightLine,
} from '../events/narrative';


@connect(null, actions)
export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
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
    this.spans = this.$el.find('span.collection');

    // Listen for cursor events.
    this.spans
      .on('mouseenter', this.onEnter.bind(this))
      .on('mouseleave', this.onLeave.bind(this))
      .on('click', this.onClick.bind(this));

  }


  /**
   * When the cursor enters a collection.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.target);

    let attrs = parseAttrs(span, {
      id: ['data-id', Number]
    });

    // Show the highlight line.
    let [lon, lat] = getCollectionLonLat(attrs.id);
    showHighlightLine(span, lon, lat);

    // Publish highlight.
    highlightCollection(attrs.id);

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let attrs = parseAttrs($(e.target), {
      id: ['data-id', Number]
    });

    hideHighlightLine();

    unhighlightCollection(attrs.id);

  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let attrs = parseAttrs($(e.target), {
      id:   ['data-id', Number],
      zoom: ['data-zoom', Number],
      cdc:  'data-cdc',
    });

    // Focus the map.
    if (attrs.id) {
      let [lon, lat] = getCollectionLonLat(attrs.id);
      focusMap(lon, lat, attrs.zoom);
    }

    // Update the choropleth.
    if (attrs.cdc) {
      this.props.showChoropleth(attrs.cdc);
    }

    // Don't select the section.
    e.stopPropagation();

  }


  /**
   * Get collection spans by id.
   *
   * @param {Number} id
   * @return {Object}
   */
  getAnchorsById(id) {
    return this.$el.find(`span.collection[data-id=${id}]`)
  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {
    this.getAnchorsById(id).addClass('highlight');
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.getAnchorsById(id).removeClass('highlight');
  }


}
