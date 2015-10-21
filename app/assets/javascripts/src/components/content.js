

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Component from './component';


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
