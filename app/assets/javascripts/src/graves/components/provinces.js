

import _ from 'lodash';
import L from 'leaflet';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import wellknown from 'wellknown';
import { loadProvinces } from '../actions';


class Provinces extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    provinces: PropTypes.object.isRequired,
  }


  /**
   * Load provinces.
   */
  componentWillMount() {
    this.props.dispatch(loadProvinces());
  }


  /**
   * Display provinces.
   */
  render() {

    let items = this.props.provinces.items;

    // TODO
    if (items.length) {

      let features = items.map(p => {
        let points = wellknown(p.geometry);
        return new L.GeoJSON(points);
      });

      let countries = L.featureGroup(features);
      countries.addTo(this.context.map);

    }

    return null;

  }


}


/**
 * Pass spatial data into the map.
 *
 * @param {Object} state
 * @return {Object}
 */
function selectProps(state) {
  return _.pick(state, 'provinces');
}


export default connect(selectProps)(Provinces);
