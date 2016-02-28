

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Component from './component';


import {
  TAGS,
  SET_TAGS,
  UNSET_TAGS,
} from '../constants';


export default class extends Component {


  static events = {

    [TAGS]: {
      [SET_TAGS]: 'setTags',
      [UNSET_TAGS]: 'unsetTags',
    }

  };


  static propTypes = {
    idToMarker: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };


  /**
   * Filter by tags.
   *
   * @param {Array} tags
   */
  setTags(tags) {

    _.each(_.values(this.props.idToMarker), m => {

      let list = m.options.feature.properties.tag_list;

      if (_.intersection(tags, list).length) {
        this.props.group.addLayer(m);
      }

      else {
        this.props.group.removeLayer(m);
      }

    });

  }


  /**
   * Show all layers.
   */
  unsetTags() {
    _.each(_.values(this.props.idToMarker), m => {
      this.props.group.addLayer(m);
    });
  }


}
