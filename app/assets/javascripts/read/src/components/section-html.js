

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as mapActions from '../actions/map';
import * as sectionActions from '../actions/sections';
import * as timeSliderActions from '../actions/time-slider';
import * as filterActions from '../actions/filters';
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

import {
  setTimeSliderRange,
} from '../events/time-slider';


@connect(null, dispatch => {

  return bindActionCreators({
    ...mapActions,
    ...sectionActions,
    ...timeSliderActions,
    ...filterActions,
  }, dispatch);

})
export default class extends Component {


  static propTypes = {
    container: PropTypes.object.isRequired,
    changeBaseLayer: PropTypes.func.isRequired,
    mountSections: PropTypes.func.isRequired,
    toggleTimeSlider: PropTypes.func.isRequired,
    setTagFilter: PropTypes.func.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.sections = this.props.container.find('.section');

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
   * Mount data attributes to the store.
   */
  _publishData() {

    let data = [];

    this.sections.each(function(i, s) {

      let attrs = utils.parseAttrs($(s), {
        tl:     ['data-tl', utils.parseLonLat],
        br:     ['data-br', utils.parseLonLat],
        label:  'data-label',
      });

      // If all map attrs are defined.
      if (!_.contains(attrs, undefined)) {
        $(s).attr('data-map-id', i);
        data.push(_.assign(attrs, { id: i }));
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
      .mouseleave(this.onLeave.bind(this))
      .click(this.onClick.bind(this));

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

    let { mapId } = utils.parseAttrs(div, {
      mapId: ['data-map-id', Number],
    });

    if (_.isNumber(mapId)) {

      // Is the section focused?
      let focused = isSectionFocused(mapId);

      // If not, click to select.
      if (!focused) {
        this.enableSelect(div);
      }

    }

  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {
    let div = $(e.currentTarget);
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

      mapId:          ['data-map-id', Number],
      zoom:           ['data-zoom', Number],
      tags:           ['data-tags', utils.parseTags],

      wmsLayerSlug:   'data-wms-layer',
      baseLayerSlug:  'data-base-layer',
      start:          'data-start',
      end:            'data-end',
      choropleth:     'data-choropleth',

    });

    // Focus the map.
    if (_.isNumber(attrs.mapId)) {
      let [lon, lat] = getSectionCenter(attrs.mapId);
      focusMap(lon, lat, attrs.zoom || 7);
    }

    // Set the base layer.
    if (attrs.baseLayerSlug) {
      this.props.changeBaseLayer(attrs.baseLayerSlug);
    }

    // Set the WMS layer.
    if (attrs.wmsLayerSlug || attrs.wmsLayerSlug === "") {
      this.props.changeWmsLayer(attrs.wmsLayerSlug);
    }

    // Set the choropleth.
    if (attrs.choropleth || attrs.choropleth === "") {
      this.props.changeChoropleth(attrs.choropleth);
    }

    // Set the date range.
    if (attrs.start && attrs.end) {
      this.props.toggleTimeSlider(true);
      setTimeSliderRange(attrs.start, attrs.end);
    }

    // Set the tag filter.
    if (attrs.tags) {
      this.props.setTagFilter(attrs.tags);
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

    // Clear move listener.
    section.off('mousemove');

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
