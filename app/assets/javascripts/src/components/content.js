

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions/route';
import Component from './component';
import Menu from './menu';
import Narrative from './narrative';


@connect(state => state.route)
export default class extends Component {


  /**
   * Render content container.
   */
  render() {
    return (
      <div id="content">

        <Menu />

        {
          this.props.narrative ?
          <Narrative slug={this.props.narrative} /> :
          null
        }

      </div>
    );
  }


}
