

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './collection.yml';


@connect(state => ({
  layers: state.collections.layers,
  highlighted: state.collections.highlighted,
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
    this.props.layers[id].setStyle(styles.path.hl);
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.props.layers[id].setStyle(styles.path.def);
  }


  render() {
    return null;
  }


}
