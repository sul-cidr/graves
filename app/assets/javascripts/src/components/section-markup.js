

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoints from 'waypoints';
import imagesLoaded from 'imagesloaded';

import Component from './component';
import { parseAttrs, parseLonLat } from '../utils';
import * as actions from '../actions/sections';


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
    this.bindScrollEvents();
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

      let attrs = parseAttrs($(s), {
        id:     ['data-id', Number],
        tl:     ['data-tl', parseLonLat],
        br:     ['data-br', parseLonLat],
        label:  'data-label',
      });

      if (!_.contains(attrs, undefined)) {
        data.push(attrs);
      }

    });

    this.props.mountSections(data);

  }


  /**
   * Track the currently-visible section.
   */
  bindScrollEvents() {

    this.sections.each((i, s) => {
      new Waypoint({

        element: s,
        offset: 200,

        handler: dir => {

          let section = (dir == 'down') ?
            $(s) :
            $(s).prev('.section');

          this.bump(section);

        }

      });
    });

    // Compensate for image heights.
    imagesLoaded(this.props.markup, () => {
      Waypoint.refreshAll();
    });

  }


  /**
   * When a section comes into view.
   *
   * @param {jQuery} section
   */
  bump(section) {
    this.sections.removeClass('highlighted');
    section.addClass('highlighted');
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
    console.log(e);
  }


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave(e) {
    console.log(e);
  }


}
