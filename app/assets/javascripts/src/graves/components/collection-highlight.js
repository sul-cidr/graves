

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './collection.yml';


@connect(state => ({
  highlighted: state.collections.highlighted,
}))
export default class extends Component {


  static propTypes = {
    idToLayer: PropTypes.object.isRequired,
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

    let layer = this.props.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.hl);
    layer.openPopup();

  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {

    let layer = this.props.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.def);
    layer.closePopup();

  }


  render() {
    return null;
  }


}
