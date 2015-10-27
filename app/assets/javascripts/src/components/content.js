

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
    return (
      <div id="content">
        {this.props.children}
      </div>
    );
  }


}
