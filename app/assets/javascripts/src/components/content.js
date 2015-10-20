

import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';


@connect(state => ({
  spatial: state.narrative.spatial
}))
export default class extends Component {


  /**
   * Render content container.
   */
  render() {

    let cx = classNames('content', {
      left: this.props.spatial
    });

    return (
      <div className={cx}>
        {this.props.children}
      </div>
    );

  }


}
