

import React from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => ({
  show: state.widgets.timeSlider
}))
export default class extends Component {


  /**
   * Render the time slider.
   */
  render() {
    return this.props.show ? (

      <div id="time-slider">
      </div>

    ) : null;
  }


}
