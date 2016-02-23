

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as utils from '../utils';
import * as actions from '../actions/sections';
import tipTpl from './section-tip.jade';

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
    this._bindResizeEvent();

  }


  /**
   * Clean DOM + listeners.
   */
  componentWillUnmount() {
    this.clearTip();
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
   * On resize, cache container position.
   */
  _bindResizeEvent() {

    this.cacheRight();

    // Re-cache on resize.
    let resize = _.debounce(this.cacheRight.bind(this), 500);
    $(window).on('resize.sections', resize);

  }


  /**
   * Cache the right-side narrative offset.
   */
  cacheRight() {
    let n = $('#narrative');
    this.right = n.offset().left + n.outerWidth();
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

    // If not, click to select.
    if (!focused) {
      this.enableSelect(attrs.id);
    }

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

    this.disableSelect(attrs.id);

  }


  /**
   * Select a section on click.
   *
   * @param {Number} id
   */
  enableSelect(id) {

    let section = this.getSectionById(id);
    section.addClass('selectable');

    // Inject the tooltip.
    this.tip = $(tipTpl()).appendTo('body');

    // Sync tooltip Y with cursor.
    section.mousemove(e => {
      this.tip.css({ top: e.clientY, left: this.right+10 });
    });

  }


  /**
   * Remove the select listener.
   *
   * @param {Number} id
   */
  disableSelect(id) {

    // Clear event listeners.
    let section = this.getSectionById(id);
    section.off('click mousemove');
    section.removeClass('selectable');

    this.clearTip();

  }


  /**
   * Remove the hover tip.
   */
  clearTip() {
    if (this.tip) {
      this.tip.remove();
    }
  }


  /**
   * Get a section by `data-id`.
   *
   * @param {Number} id
   */
  getSectionById(id) {
    return this.sections.filter(`[data-id="${id}"]`);
  }


}
