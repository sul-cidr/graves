

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  selected: state.collections.selected,
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    idToLayer: PropTypes.object.isRequired,
    selected: PropTypes.any,
  }


  /**
   * Manifest the highlighted collection.
   */
  componentDidUpdate() {

    if (this.props.selected) {

      // Get a marker for the id.
      let layer = this.props.idToLayer[this.props.selected];
      if (!layer) return;

      // Fly to the burial.
      this.context.map.flyTo(layer.getLatLng(), 8);

    }

  }


  render() {
    return null;
  }


}
