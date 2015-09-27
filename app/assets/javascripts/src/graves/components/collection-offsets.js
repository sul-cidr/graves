

import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';

import {
  GET_COLLECTION_OFFSET,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'collections'


  static requests = {
    GET_COLLECTION_OFFSET: 'getOffset',
  }


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    idToLayer: PropTypes.object.isRequired,
  }


  /**
   * Get the window-space offset of a marker.
   *
   * @param {Number} id
   * @return {Array}
   */
  getOffset(id) {

    // ID -> coordinate.
    let latLng = this.props.idToLayer[id].getLatLng();

    // Coordinate -> layer point.
    let layerPoint = this.context.map.latLngToLayerPoint(latLng);

    // Layer point -> container point.
    let point = this.context.map.layerPointToContainerPoint(layerPoint);

    return [point.x, point.y];

  }


}
