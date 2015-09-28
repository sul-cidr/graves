

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';
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

    let points = [
      swap(tl),
      swap([br[0], tl[1]]),
      swap(br),
      swap([tl[0], br[1]]),
    ];

    this.box = L.polygon(points);
    this.props.group.addLayer(this.box);

  }


  /**
   * Remove the box/layer.
   */
  componentWillUnmount() {
    this.context.map.removeLayer(this.box);
  }


  render() {
    return null;
  }


}
