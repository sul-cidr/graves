

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from '../actions/map';
import * as sectionActions from '../actions/sections';
import * as utils from '../utils';

import Component from './component';
import tipTpl from './section-tip.jade';


import {
  isSectionFocused,
  getSectionCenter,
} from '../events/sections';


import {
  focusMap,
} from '../events/map';


@connect(null, dispatch => {

  return bindActionCreators({
    ...mapActions,
    ...sectionActions,
  }, dispatch);

})
export default class extends Component {


  static propTypes = {
    container: PropTypes.object.isRequired,
    changeBaseLayer: PropTypes.func.isRequired,
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
      .mouseenter(this.onEnter.bind(this))
      .mouseleave(this.onLeave.bind(this));

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

    let { id } = utils.parseAttrs(div, {
      id: ['data-id', Number],
    });

    // Is the section focused?
    let focused = isSectionFocused(id);

    // If not, click to select.
    if (!focused) {
      this.enableSelect(div);
    }

  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {

    let div = $(e.currentTarget);

    let { id } = utils.parseAttrs(div, {
      id: ['data-id', Number],
    });

    this.disableSelect(div);

  }


  /**
   * When a section is clicked.
   *
   * @param {Object} e
   */
  onClick(e) {

    let div = $(e.currentTarget);

    let attrs = utils.parseAttrs(div, {
      id:           ['data-id', Number],
      baseLayerId:  ['data-base-layer', Number],
      zoom:         ['data-zoom', Number],
    });

    // Focus the map.
    if (_.isNumber(attrs.id)) {
      let [lon, lat] = getSectionCenter(attrs.id);
      focusMap(lon, lat, attrs.zoom || 7);
    }

    // Set the base layer.
    if (attrs.baseLayerId) {
      this.props.changeBaseLayer(attrs.baseLayerId);
    }

    this.disableSelect(div);

  }


  /**
   * Select a section on click.
   *
   * @param {DOMElement} section
   */
  enableSelect(section) {

    section.addClass('selectable');

    // Inject the tooltip.
    this.tip = $(tipTpl()).appendTo('body');

    // Sync tooltip Y with cursor.
    section.mousemove(e => {
      this.tip.css({ top: e.clientY, left: this.right+10 });
    });

    // Click to select.
    section.click(this.onClick.bind(this));

  }


  /**
   * Remove the select listener.
   *
   * @param {DOMElement} section
   */
  disableSelect(section) {

    // Reset DOM.
    section.removeClass('selectable');
    this.clearTip();

    // Clear event listeners.
    section.off('click mousemove');

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
