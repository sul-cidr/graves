

import React, { PropTypes } from 'react';
import L from 'leaflet';

import Component from './component';
import * as styles from './section.yml';
import { swap } from '../utils';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    group: PropTypes.object.isRequired,
    idToLayer: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }


  /**
   * Add the section.
   */
  componentWillMount() {

    let {
      label: label,
      id: id,
      tl: tl,
      br: br,
    } = this.props.data;

    // Box:

    let points = [
      swap(tl),
      swap([br[0], tl[1]]),
      swap(br),
      swap([tl[0], br[1]]),
    ];

    let options = {
      pointerEvents: 'none',
      ...styles.path.def
    };

    this.box = L.polygon(points, options);
    this.props.group.addLayer(this.box);

    // Label:

    let icon = L.divIcon({
      html: label,
      iconSize: null,
    });

    this.label = L.marker([br[1], tl[0]], { icon });
    this.props.group.addLayer(this.label);

    this.props.idToLayer[id] = {
      box: this.box,
      label: this.label,
    };

  }


  /**
   * Remove the box/layer.
   */
  componentWillUnmount() {
    this.context.map.removeLayer(this.box);
    this.context.map.removeLayer(this.label);
  }


}
