

import $ from 'jquery';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RadioComponent from '../lib/radio-component';
import { parseLonLat } from '../utils';
import * as actions from '../actions/sections';


@connect(null, actions)
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

    // Extract data attributes.
    let attrs = [];
    this.sections.each((i, s) => {

      let label = $(s).attr('data-label');
      let tl = parseLonLat($(s).attr('data-tl'));
      let br = parseLonLat($(s).attr('data-br'));

      if (label && tl && br) {
        attrs.push({ label, tl, br });
      }

    });

    this.props.mountSections(attrs);

  }


}
