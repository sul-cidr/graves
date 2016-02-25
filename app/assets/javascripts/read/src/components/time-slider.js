

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';


export default class extends Component {


  /**
   * Render the time slider.
   */
  componentDidMount() {
    console.log(this.refs.slider);
  }


  /**
   * Render the time slider.
   */
  render() {
    return (
      <div id="time-slider">
        <div ref="slider"></div>
      </div>
    );
  }


}
