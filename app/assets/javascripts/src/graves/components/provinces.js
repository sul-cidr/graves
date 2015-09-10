

import _ from 'lodash';
import L from 'leaflet';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import wellknown from 'wellknown';
import { loadProvinces } from '../actions/provinces';
import styles from './provinces.yml';


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

    if (items.length) {

      // WKT -> GeoJSON.
      let features = items.map(p => {
        let points = wellknown(p.geometry);
        return new L.GeoJSON(points, styles.path);
      });

      let countries = L.featureGroup(features);
      countries.addTo(this.context.map);

    }

    return null;

  }


}


/**
 * Map state into props.
 *
 * @param {Object} state
 * @return {Object}
 */
function selectProps(state) {
  return _.pick(state, 'provinces');
}


export default connect(selectProps)(Provinces);
