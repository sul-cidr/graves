

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from '../actions/map';
import * as events from '../events/collections';
import * as utils from '../utils';

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


@connect(null, dispatch => {

  return bindActionCreators({
    ...mapActions,
  }, dispatch);

})
export default class extends Component {


  static events = {
    [COLLECTIONS]: {
      [HIGHLIGHT_COLLECTION]: 'highlight',
      [UNHIGHLIGHT_COLLECTION]: 'unhighlight',
    }
  };


  static propTypes = {
    container: PropTypes.object.isRequired,
    changeBaseLayer: PropTypes.func.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.collections = this.props.container.find('.collection');

    this.collections
      .mouseenter(this.onEnter.bind(this))
      .mouseleave(this.onLeave.bind(this))
      .click(this.onClick.bind(this));

  }


  /**
   * When the cursor enters a collection.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let span = $(e.target);

    let { id } = utils.parseAttrs(span, {
      id: ['data-id', Number],
    });

    if (id) {

      // Show the highlight line.
      let [lon, lat] = getCollectionLonLat(id);
      showMapLine(span, lon, lat);

      // Publish highlight.
      highlightCollection(id);

    }

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let span = $(e.target);

    let { id } = utils.parseAttrs(span, {
      id: ['data-id', Number]
    });

    if (id) {

      // Remove the map line.
      hideMapLine();

      // Publish unhighlight.
      unhighlightCollection(id);

    }

  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let span = $(e.target);

    let attrs = utils.parseAttrs(span, {
      id:           ['data-id', Number],
      baseLayerId:  ['data-base-layer', Number],
      zoom:         ['data-zoom', Number],
    });

    // Focus the map.
    if (attrs.id) {
      let [lon, lat] = getCollectionLonLat(attrs.id);
      focusMap(lon, lat, attrs.zoom);
    }

    // Set the base layer.
    if (attrs.baseLayerId) {
      this.props.changeBaseLayer(attrs.baseLayerId);
    }

    // Prevent the click from triggering a section focus.
    e.stopPropagation();

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
