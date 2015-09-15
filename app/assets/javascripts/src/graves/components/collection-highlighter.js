

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './collection.yml';


@connect(state => ({
  highlighted: state.collections.highlighted
}))
export default class extends Component {


  static propTypes = {
    idMap: PropTypes.object.isRequired,
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
      this.highlight(nextProps.highlighted);
    }

    // Unhighlight.
    else if (this.props.highlighted && !nextProps.highlighted) {
      this.unhighlight(this.props.highlighted);
    }

    return false;

  }


  /**
   * Highlight a collection.
   */
  highlight(id) {
    this.props.idMap[id].setStyle(styles.path.hl);
  }


  /**
   * Unhighlight a collection.
   */
  unhighlight(id) {
    this.props.idMap[id].setStyle(styles.path.def);
  }


  render() {
    return null;
  }


}
