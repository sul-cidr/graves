

import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';
import { SELECT_COLLECTION, } from '../constants';


export default class extends RadioComponent {


  static channelName = 'collections'


  static events = {
    collections: {
      [SELECT_COLLECTION]: 'select'
    }
  }


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    idToLayer: PropTypes.object.isRequired,
    selected: PropTypes.any,
  }


  /**
   * Zoom to the selected collection.
   *
   * @param {Number} id
   */
  select(id) {

    // Get a marker for the id.
    let layer = this.props.idToLayer[id];
    if (!layer) return;

    // Fly to the burial.
    this.context.map.flyTo(layer.getLatLng(), 8);

  }


}
