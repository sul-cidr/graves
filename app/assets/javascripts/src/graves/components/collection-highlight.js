

import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
    highlighted: PropTypes.any,
  }


  /**
   * Apply the current highlight.
   */
  render() {
    console.log(this.props.highlighted);
    return null;
  }


}
