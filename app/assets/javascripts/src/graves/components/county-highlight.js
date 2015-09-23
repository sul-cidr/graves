

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import styles from './county.yml';


@connect(state => ({
  layers: state.counties.layers,
  highlighted: state.counties.highlighted,
}))
export default class extends Component {


  static propTypes = {
    layers: PropTypes.object.isRequired,
    highlighted: PropTypes.any,
  }


  /**
   * Manifest the highlighted collection.
   *
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {

    // Highlight.
    if (!prevProps.highlighted && this.props.highlighted) {
      this.highlight(this.props.highlighted);
    }

    // Unhighlight.
    else if (prevProps.highlighted && !this.props.highlighted) {
      this.unhighlight(prevProps.highlighted);
    }

  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {
    console.log(this.props.layers[id]);
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    // TODO
  }


  render() {
    return null;
  }


}
