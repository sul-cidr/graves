

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';


@connect(state => ({
  show: state.timeSlider.show
}))
export default class extends Component {


  static propTypes = {
    show: PropTypes.bool.isRequired,
  };


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
