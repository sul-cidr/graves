

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './collection.yml';


export default class extends Component {


  static propTypes = {
    highlight: PropTypes.func.isRequired,
    unhighlight: PropTypes.func.isRequired,
    highlighted: PropTypes.any,
  }


  /**
   * Manifest the highlighted collection.
   *
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps) {

    // Highlight.
    if (!this.props.highlighted && nextProps.highlighted) {
      this.props.highlight(nextProps.highlighted);
    }

    // Unhighlight.
    else if (this.props.highlighted && !nextProps.highlighted) {
      this.props.unhighlight(this.props.highlighted);
    }

    return false;

  }


  render() {
    return null;
  }


}
