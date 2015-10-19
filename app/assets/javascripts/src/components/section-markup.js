

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'waypoints';
import imagesLoaded from 'imagesloaded';
import RadioComponent from '../lib/radio-component';
import { parseLonLat } from '../utils';
import * as actions from '../actions/sections';


@connect(
  state => ({
    slug: state.route.narrative
  }),
  actions
)
export default class extends RadioComponent {


  static channelName = 'sections';


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

    // Update waypoint offsets.
    imagesLoaded(this.props.markup, () => {
      Waypoint.refreshAll();
    });

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

      let key   = `${this.props.slug}-${i}`;
      let label = $(s).attr('data-label');
      let tl    = parseLonLat($(s).attr('data-tl'));
      let br    = parseLonLat($(s).attr('data-br'));

      if (label && tl && br) {
        attrs.push({ key, label, tl, br });
      }

    });

    this.props.mountSections(attrs);

  }


  /**
   * Monitor the visible section.
   */
  listenForScroll() {

    this.sections.each((i, s) => {
      new Waypoint({

        element: s,
        offset: 100,

        handler: function(dir) {
          let spatial = $(this.element).is('[data-spatial]');
          console.log(spatial);
        }

      });
    });

  }


}
