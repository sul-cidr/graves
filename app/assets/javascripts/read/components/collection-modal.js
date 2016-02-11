

import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  selected: state.collections.selected
}))
export default class extends Component {


  /**
   * Render a collection modal.
   */
  render() {

    console.log(this.props.selected);

    // TODO
    return null;

  }


}
