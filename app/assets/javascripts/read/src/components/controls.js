

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toggle from 'react-toggle';

import * as mapActions from '../actions/map';
import * as timeSliderActions from '../actions/time-slider';

import Component from './component';
import ClearFiltersButton from './clear-filters-button';


@connect(

  state => ({
    showMapMenu: state.map.showMenu,
    showTimeSlider: state.timeSlider.show,
    tags: state.filters.tags,
  }),

  dispatch => {
    return bindActionCreators({
      ...mapActions,
      ...timeSliderActions,
    }, dispatch);
  }

)
export default class extends Component {


  static propTypes = {

    showMapMenu: PropTypes.bool.isRequired,
    showTimeSlider: PropTypes.bool.isRequired,

    toggleMapMenu: PropTypes.func.isRequired,
    toggleTimeSlider: PropTypes.func.isRequired,

    tags: PropTypes.array,

  };


  /**
   * Render the controls block.
   */
  render() {
    return (
      <div id="controls">


        <label className="toggle map-menu">
          <Toggle
            onChange={this.onMapMenuToggle.bind(this)}
            checked={this.props.showMapMenu}
          />
          <span className="label-text">Map Options</span>
        </label>


        <label className="toggle time-slider">
          <Toggle
            onChange={this.onTimeSliderToggle.bind(this)}
            checked={this.props.showTimeSlider}
          />
          <span className="label-text">Time Slider</span>
        </label>


        {
          this.props.tags ?
          <ClearFiltersButton /> : null
        }


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
