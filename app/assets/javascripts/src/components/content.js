

import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  spatial: state.narrative.spatial
}))
export default class extends Component {


  /**
   * Render content container.
   */
  render() {

    console.log(this.props.spatial);

    return (
      <div className="content left">
        {this.props.children}
      </div>
    );

  }


}
