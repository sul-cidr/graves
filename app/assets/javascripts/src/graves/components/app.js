

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Map from './map';
import Narrative from './narrative';
import Splash from './splash';


@connect(state => ({
  slug: state.route.narrative
}))
export default class extends Component {


  static propTypes = {
    slug: PropTypes.any,
  }


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <div className="wrapper">

        <Map />

        { this.props.slug ?
          <Narrative slug={this.props.slug} /> :
          <Splash /> }

      </div>
    );
  }


}
