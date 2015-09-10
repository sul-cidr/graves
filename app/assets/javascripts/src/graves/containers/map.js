

import _ from 'lodash';
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
  provinces: PropTypes.object.isRequired,
};


/**
 * Pass spatial data into the map.
 *
 * @param {Object} state
 * @return {Object}
 */
function select(state) {
  return _.pick(state, 'provinces');
}


export default connect(select)(Map);
