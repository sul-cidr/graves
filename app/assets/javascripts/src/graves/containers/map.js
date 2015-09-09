

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { loadProvinces } from '../actions';


class Map extends Component {


  /**
   * TODO|dev
   * Load provinces.
   */
  componentDidMount() {
    this.props.dispatch(loadProvinces());
  }


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <h1>Map</h1>
    );
  }


}


Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


/**
 * Pass spatial data into the map.
 *
 * @param {Object} state
 * @return {Object}
 */
function select(state) {

  const { provinces } = state;

  return {
    provinces
  };

}


export default connect(select)(Map);
