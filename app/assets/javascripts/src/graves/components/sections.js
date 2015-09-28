

import $ from 'jquery';
import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';


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

    // Extract label/tl/br attributes.
    let attrs = [];
    this.sections.each((i, s) => {
      attrs.push({
        label: $(s).attr('data-label'),
        tr: $(s).attr('data-tl'),
        bl: $(s).attr('data-br'),
      });
    });

  }


}
