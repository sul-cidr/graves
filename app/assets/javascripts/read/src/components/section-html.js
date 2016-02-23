

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as utils from '../utils';
import * as actions from '../actions/sections';

import Component from './component';


import {
  isSectionFocused
} from '../events/map';


@connect(null, actions)
export default class extends Component {


  static propTypes = {
    container: PropTypes.object.isRequired,
    mountSections: PropTypes.func.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.sections = this.props.container.find('.section');

    this._generateDataIds();
    this._publishData();
    this._bindCursorEvents();

  }


  /**
   * Write `data-id` attributes.
   */
  _generateDataIds() {
    this.sections.each((i, s) => {
      $(s).attr('data-id', i);
    });
  }


  /**
   * Mount data attributes to the store.
   */
  _publishData() {

    let data = [];

    this.sections.each(function(i, s) {

      let attrs = utils.parseAttrs($(s), {
        id:     ['data-id', Number],
        tl:     ['data-tl', utils.parseLonLat],
        br:     ['data-br', utils.parseLonLat],
        label:  'data-label',
      });

      // Don't publish invalid sections.
      if (!_.contains(attrs, undefined)) {
        data.push(attrs);
      }

    });

    this.props.mountSections(data);

  }


  /**
   * Listen for section enter/leave.
   */
  _bindCursorEvents() {

    this.sections
      .on('mouseenter', this.onEnter.bind(this))
      .on('mouseleave', this.onLeave.bind(this));

  }


  /**
   * When the cursor enters a section.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let div = $(e.currentTarget);

    let attrs = utils.parseAttrs(div, {
      id: ['data-id', Number],
    });

    // Is the section focused?
    let focused = isSectionFocused(attrs.id);

  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let div = $(e.currentTarget);

    let attrs = utils.parseAttrs(div, {
      id: ['data-id', Number],
    });

    // TODO

  }


}
