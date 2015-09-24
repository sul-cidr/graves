

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import styles from './county.yml';


@connect(state => ({
  idToPath: state.counties.idToPath,
  highlighted: state.counties.highlighted,
}))
export default class extends Component {


  static propTypes = {
    idToPath: PropTypes.object.isRequired,
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
    this.props.idToPath[id].classed('highlight', true);
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.props.idToPath[id].classed('highlight', false);
  }


  render() {
    return null;
  }


}
