

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';
import MapMenu from './map-menu';
import TimeSlider from './time-slider';
import Legend from './legend';
import NavigationHash from './navigation-hash';


@connect(state => ({
  mapMenu: state.map.showMenu,
  timeSlider: state.timeSlider.show,
}))
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
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

      {
        !this.props.timeSlider ?
        <Legend /> : null
      }

      <NavigationHash map={ this.props.map } />
      </div>
    );
  }


}
