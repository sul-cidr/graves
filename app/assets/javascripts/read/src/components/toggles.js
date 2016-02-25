

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import Toggle from 'react-toggle';

import * as actions from '../actions/widgets';

import Component from './component';


@connect(
  state => state.widgets,
  actions,
)
export default class extends Component {


  static propTypes = {
    mapMenu: PropTypes.bool.isRequired,
    toggleTimeSlider: PropTypes.func.isRequired,
    toggleMapMenu: PropTypes.func.isRequired,
  };


  /**
   * Render the widget toggles.
   */
  render() {
    return (
      <div id="toggles">

        <label>
          <Toggle
            onChange={this.onMapMenuToggle.bind(this)}
            defaultChecked={this.props.mapMenu}
          />
          <span className="label-text">Map Options</span>
        </label>

        <label>
          <Toggle
            onChange={this.onTimeSliderToggle.bind(this)}
            defaultChecked={this.props.mapMenu}
          />
          <span className="label-text">Time Slider</span>
        </label>

      </div>
    );
  }


  /**
   * When "Map Options" is toggled.
   *
   * @param {Object} e
   */
  onMapMenuToggle(e) {
    this.props.toggleMapMenu(e.target.checked);
  }


  /**
   * When "Timeline" is toggled.
   *
   * @param {Object} e
   */
  onTimeSliderToggle(e) {
    this.props.toggleTimeSlider(e.target.checked);
  }


}
