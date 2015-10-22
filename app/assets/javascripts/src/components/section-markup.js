

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoints from 'waypoints';
import imagesLoaded from 'imagesloaded';

import Component from './component';
import { parseLonLat } from '../utils';
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
   * Mount data attributes to the store.
   */
  publishData() {

    let attrs = [];

    this.sections.each((i, s) => {

      let key = `${this.props.slug}-${i}`;
      let tl = parseLonLat($(s).attr('data-tl'));
      let br = parseLonLat($(s).attr('data-br'));
      let label = $(s).attr('data-label');

      if (label && tl && br) {
        attrs.push({ key, tl, br, label });
      }

    });

    this.props.mountSections(attrs);

  }


  /**
   * Track the currently-visible section.
   */
  listenForScroll() {

    this.sections.each((i, s) => {
      new Waypoint({

        element: s,
        offset: 200,

        handler: function(dir) {

          let span = (dir == 'up') ?
            $(this.element).prev('.section') :
            $(this.element);

          console.log(span);

        }

      });
    });

    // Compensate for image heights.
    imagesLoaded(this.props.markup, () => {
      Waypoint.refreshAll();
    });

  }


}
