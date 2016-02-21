

import $ from 'jquery';
import React, { PropTypes } from 'react';

import * as utils from '../utils';

import Component from './component';


export default class extends Component {


  static propTypes = {
    container: PropTypes.object.isRequired,
  };


  /**
   * Parse sections.
   */
  componentDidMount() {

    this.sections = this.props.container.find('.section');

    this._generateDataIds();
    this._publishData();

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

    this.sections.each(function(i, s) {

      let attrs = utils.parseAttrs($(s), {
        id:     ['data-id', Number],
        tl:     ['data-tl', utils.parseLonLat],
        br:     ['data-br', utils.parseLonLat],
        label:  'data-label',
      });

      console.log(attrs);

    });

  }


}
