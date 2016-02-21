

import _ from 'lodash';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as utils from '../utils';

import Component from './component';


@connect(
  state => ({
    sections: state.sections.attrs
  })
)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Initialize the feature groups.
   */
  componentWillMount() {

    this.idToBox = {};

    // Box group.
    this.boxes = L.featureGroup();
    this.boxes.addTo(this.props.map);

  }


  render() {

    if (this.props.sections) {

      // Clear existing markers.
      this.boxes.clearLayers();

      _.each(this.props.sections, s => {

        let { id, tl, br, label } = s;

        // ** Box:

        let points = [
          utils.swap(tl),
          utils.swap([br[0], tl[1]]),
          utils.swap(br),
          utils.swap([tl[0], br[1]]),
        ];

        let box = L.polygon(points, {
          pointerEvents: 'none',
        });

        this.boxes.addLayer(box);
        this.idToBox[id] = box;

      });

    }

    return null;

  }


}
