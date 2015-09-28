

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
import * as styles from './section.yml';
import { swap } from '../utils';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    attrs: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  }


  /**
   * Add the section.
   */
  componentWillMount() {

    let {
      label: label,
      tl: tl,
      br: br,
    } = this.props.attrs;

    // Box:

    let points = [
      swap(tl),
      swap([br[0], tl[1]]),
      swap(br),
      swap([tl[0], br[1]]),
    ];

    this.box = L.polygon(points, styles.path.def);
    this.props.group.addLayer(this.box);

    // Label:

    let icon = L.divIcon({
      html: label,
      iconSize: null,
    });

    this.label = L.marker([br[1], tl[0]], { icon });
    this.props.group.addLayer(this.label);

  }


  /**
   * Remove the box/layer.
   */
  componentWillUnmount() {
    this.context.map.removeLayer(this.box);
    this.context.map.removeLayer(this.label);
  }


  render() {
    return null;
  }


}
