

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoints from 'waypoints';
import imagesLoaded from 'imagesloaded';

import Component from './component';
import { parseAttrs, parseLonLat } from '../utils';
import * as actions from '../actions/sections';


@connect(null, actions)
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

    this.generateDataIds();
    this.publishData();
    this.listenForScroll();

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
   * Monitor the visible section.
   */
  listenForScroll() {

    this.sections.each((i, s) => {
      new Waypoint({

        element: s,
        offset: 100,

        handler: dir => {

          let section = (dir == 'down') ?
            $(s) : $(s).prev('.section');

          console.log(section);

        }

      });
    });

    // Update waypoint offsets.
    imagesLoaded(this.props.markup, () => {
      Waypoint.refreshAll();
    });

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
