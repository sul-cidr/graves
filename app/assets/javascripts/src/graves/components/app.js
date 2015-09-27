

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';

import * as actions from '../actions/editor';
import Content from './content';
import Map from './map';
import Narrative from './narrative';


@connect(
  state => state.route,
  actions
)
export default class extends Component {


  static propTypes = {
    explore: PropTypes.bool.isRequired,
    narrative: PropTypes.any,
  }


  /**
   * Listen for edit mode toggle.
   */
  componentDidMount() {
    Mousetrap.bind(['command+e', 'ctrl+e'], () => {
      this.props.toggleEditor();
    });
  }


  /**
   * Render the top-level application structure.
   */
  render() {

    let content = null;

    // Render a narrative, when one is active.
    if (this.props.narrative) {
      content = (
        <Content>
          <Narrative slug={this.props.narrative} />
        </Content>
      );
    }

    return (
      <div className="wrapper">
        <Map />
        {content}
      </div>
    );

  }


}
