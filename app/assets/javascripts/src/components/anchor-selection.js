

import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';
import { SELECT_ANCHOR, } from '../constants';
import { swap } from '../utils';


export default class extends RadioComponent {


  static channelName = 'anchors'


  static events = {
    anchors: {
      [SELECT_ANCHOR]: 'select'
    }
  }


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  /**
   * Zoom to the selected anchor.
   *
   * @param {Array<Number>} lonlat
   * @param {Number} zoom
   */
  select(lonlat, zoom=8) {
    this.context.map.flyTo(swap(lonlat), zoom);
  }


}
