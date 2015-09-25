

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Map from './map';
import Narrative from './narrative';
import Splash from './splash';


@connect(state => ({
  narrative: state.route.narrative
}))
export default class extends Component {


  static propTypes = {
    narrative: PropTypes.any,
  }


  /**
   * Render the top-level application structure.
   */
  render() {
    console.log(this.props.narrative);
    return (
      <div className="wrapper">
        <Map />
      </div>
    );
  }


}
