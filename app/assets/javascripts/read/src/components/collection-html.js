

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';

import * as utils from '../utils';
import * as events from '../events/collections';

import Component from './component';


export default class extends Component {


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
    events.highlightCollection(attrs.id);

  }


  /**
   * When the cursor leaves a collection.
   *
   * @param {Object} e
   */
  onLeave(e) {
    // TODO
  }


  /**
   * When a collection is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {
    // TODO
  }


}
