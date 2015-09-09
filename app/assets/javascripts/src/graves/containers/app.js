

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Map from './map';


export default class App extends Component {


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <Map />
    );
  }


}
