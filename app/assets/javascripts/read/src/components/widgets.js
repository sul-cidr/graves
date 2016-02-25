

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';
import MapMenu from './map-menu';
import TimeSlider from './time-slider';


@connect(state => ({
  mapMenu: state.map.showMenu,
  timeSlider: state.timeSlider.show,
}))
export default class extends Component {


  static propTypes = {
    mapMenu: PropTypes.bool.isRequired,
    timeSlider: PropTypes.bool.isRequired,
  };


  /**
   * Render the widgets.
   */
  render() {
    return (
      <div id="widgets">

      {
        this.props.mapMenu ?
        <MapMenu /> : null
      }

      {
        this.props.timeSlider ?
        <TimeSlider /> : null
      }

      </div>
    );
  }


}
