

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
  highlightSection,
  unhighlightSection,
} from '../events/sections';


@connect(
  state => ({
    slug: state.route.narrative
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    markup: PropTypes.object.isRequired,
  }


  /**
   * Wrap the container, extract sections.
   */
  componentDidMount() {

    this.$el = $(this.props.markup);
    this.sections = this.$el.find('.section');

    this.generateKeys();
    this.publishData();
    this.bindCursorEvents();

  }


  /**
   * Unmount the section layers.
   */
  componentWillUnmount() {
    this.props.unmountSections();
  }


  /**
   * Mount data attributes to the store.
   */
  generateKeys() {
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

      if (!_.contains(attrs, undefined)) {
        data.push(attrs);
      }

    });

    this.props.mountSections(data);

  }


  /**
   * Listen for section hover/blur.
   */
  bindCursorEvents() {

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

    // TODO|dev
    let attrs = this.parseAttrs(e.currentTarget);
    highlightSection(attrs.id);

    // highlight
    // if not focused, enable select

  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {

    // TODO|dev
    let attrs = this.parseAttrs(e.currentTarget);
    unhighlightSection(attrs.id);

    // unhighlight
    // disable select

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
