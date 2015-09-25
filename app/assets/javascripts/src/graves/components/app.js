

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Map from './map';
import Narrative from './narrative';
import Splash from './splash';


@connect(state => state.route)
export default class extends Component {


  static propTypes = {
    explore: PropTypes.bool.isRequired,
    narrative: PropTypes.any,
  }


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <div className="wrapper">

        <Map />

        {this.props.narrative ?
          <Narrative slug={this.props.narrative} /> : null}

        {!this.props.narrative && !this.props.explore ?
          <Splash /> : null}

      </div>
    );
  }


}
