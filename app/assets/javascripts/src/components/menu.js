

import React, { Component } from 'react';
import { connect } from 'react-redux';
import NarrativeSelect from './narrative-select';


@connect(state => ({
  narrative: state.route.narrative
}))
export default class extends Component {


  /**
   * Render the menu.
   */
  render() {

    let x = !this.props.narrative ? null : (
      <i
        className="fa fa-times close"
        onClick={this.onClose.bind(this)}
      ></i>
    );

    return (
      <div id="menu">

        <h1 className="wordmark">
          <i className="fa fa-home"></i>{' '}
          Chinese Graves
        </h1>

        <NarrativeSelect />

        {x}

      </div>
    );

  }


  /**
   * Close the current narrative.
   */
  onClose() {
    window.location.hash = '';
  }


}
