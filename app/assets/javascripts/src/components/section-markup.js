

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoints from 'waypoints';
import imagesLoaded from 'imagesloaded';

import Component from './component';
import { parseAttrs, parseLonLat } from '../utils';
import * as actions from '../actions/sections';

import {
  SECTIONS,
  MAP,
  SELECT_SECTION
} from '../constants';

import {
  scrollSection
} from '../events/sections';

import {
  isSectionFocused
} from '../events/map';


@connect(null, actions)
export default class extends Component {


  static events = {
    [SECTIONS]: {
      [SELECT_SECTION]: 'select'
    }
  }


  static propTypes = {
    markup: PropTypes.object.isRequired,
  }


  /**
   * Wrap the container, extract sections.
   */
  componentDidMount() {

    this.$el = $(this.props.markup);
    this.sections = this.$el.find('.section');

    this.generateDataIds();
    this.publishData();
    this.bindCursorEvents();
    this.monitorScroll();

  }


  /**
   * Unmount the section layers.
   */
  componentWillUnmount() {
    this.props.unmountSections();
  }


  /**
   * Write `data-id` attributes.
   */
  generateDataIds() {
    this.sections.each((i, s) => {
      $(s).attr('data-id', i);
    });
  }


  /**
   * Mount data attributes to the store.
   */
  publishData() {

    let data = [];

    this.sections.each((i, s) => {

      let attrs = this.parseAttrs(s)

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
  bindCursorEvents() {

    this.sections
      .on('mouseenter', this.onEnter.bind(this))
      .on('mouseleave', this.onLeave.bind(this));

  }


  /**
   * Monitor the visible section.
   */
  monitorScroll() {

    this.sections.each((i, s) => {
      new Waypoint({

        element: s,
        offset: 100,

        handler: dir => {

          let section = (dir == 'down') ?
            $(s) : $(s).prev('.section');

          let attrs = parseAttrs(section, {
            id: ['data-id', Number]
          });

          scrollSection(attrs.id);

        }

      });
    });

    // Update waypoint offsets.
    imagesLoaded(this.props.markup, () => {
      Waypoint.refreshAll();
    });

  }


  // ** Publishers:


  /**
   * When the cursor enters a section.
   *
   * @param {Object} e
   */
  onEnter(e) {

    let attrs = parseAttrs($(e.currentTarget), {
      id: ['data-id', Number]
    });

    // Is the section focused on the map?
    let focused = isSectionFocused(attrs.id);
    console.log(focused);

  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {
    // TODO
  }


  // ** Renderers:


  /**
   * Scroll a section into view.
   *
   * @param {Number} id
   * @param {String} origin
   */
  select(id, origin) {

    let section = this.getSectionById(id);

    // Scroll into view.
    $('body').animate({
      scrollTop: section[0].offsetTop - 50
    }, {
      duration: 700
    });

  }


  // ** Helpers:


  /**
   * Get a section by `data-id`.
   *
   * @param {Number} id
   */
  getSectionById(id) {
    return this.sections.filter(`[data-id="${id}"]`);
  }


  /**
   * Extract data attributes from a section.
   *
   * @param {HTMLDivElement} section
   */
  parseAttrs(section) {

    return parseAttrs($(section), {
      id:     ['data-id', Number],
      tl:     ['data-tl', parseLonLat],
      br:     ['data-br', parseLonLat],
      label:  'data-label',
    });

  }


}
