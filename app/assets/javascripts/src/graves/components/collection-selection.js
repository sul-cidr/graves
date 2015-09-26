

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  selected: state.collections.selected,
}))
export default class extends Component {


  static propTypes = {
    selected: PropTypes.any,
  }


  /**
   * Manifest the highlighted collection.
   */
  componentDidUpdate() {
    console.log(this.props.selected);
  }


  render() {
    return null;
  }


}
