

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Component from './component';


import {
  TIME_SLIDER,
  SET_DATE_RANGE,
  UNSET_DATE_RANGE,
} from '../constants';


export default class extends Component {


  static events = {

    [TIME_SLIDER]: {
      [SET_DATE_RANGE]: 'setDateRange',
      [UNSET_DATE_RANGE]: 'unsetDateRange',
    }

  };


  static propTypes = {
    idToMarker: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };


  /**
   * Filter by date.
   *
   * @param {Date} start
   * @param {Date} end
   */
  setDateRange(start, end) {

    _.each(_.values(this.props.idToMarker), m => {

      let date = m.options.date;

      if (date.isBefore(start) || date.isAfter(end)) {
        this.props.group.removeLayer(m);
      }

      else {
        this.props.group.addLayer(m);
      }

    });

  }


  /**
   * Show all layers.
   *
   * @param {Date} start
   * @param {Date} end
   */
  unsetDateRange(start, end) {
    _.each(_.values(this.props.idToMarker), m => {
      this.props.group.addLayer(m);
    });
  }


}
