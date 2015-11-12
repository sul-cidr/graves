

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions/route';
import Component from './component';
import Narrative from './narrative';


@connect(state => state.route)
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
