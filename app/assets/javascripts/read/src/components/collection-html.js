

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';

import * as utils from '../utils';
import * as events from '../events/collections';

import Component from './component';


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
  showMapLine,
  hideMapLine,
  focusMap,
} from '../events/map';


export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
    }
  };


  static propTypes = {
    container: PropTypes.object.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.collections = this.props.container.find('.collection');

    this.collections
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

    let attrs = utils.parseAttrs(span, {
      id: ['data-id', Number]
    });

    // Publish highlight.
    highlightCollection(attrs.id);

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let span = $(e.target);

    let attrs = utils.parseAttrs(span, {
      id: ['data-id', Number]
    });

    // Publish unhighlight.
    unhighlightCollection(attrs.id);

  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let span = $(e.target);

    let attrs = utils.parseAttrs(span, {
      id:   ['data-id', Number],
      zoom: ['data-zoom', Number],
    });

    if (attrs.id) {
      let [lon, lat] = getCollectionLonLat(attrs.id);
      focusMap(lon, lat, attrs.zoom);
    }

  }


  /**
   * Get collection spans by id.
   *
   * @param {Number} id
   * @return {DOMElement}
   */
  getAnchorsById(id) {
    return this.props.container.find(`.collection[data-id=${id}]`)
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
