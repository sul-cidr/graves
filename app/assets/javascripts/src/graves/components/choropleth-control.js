

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/counties';
import codes from '../data/cdc-codes.yml';


@connect(null, actions)
export default class extends Component {


  /**
   * Render choropleth control.
   */
  render() {

    let options = _.map(codes.counties, (label, code) => {
      return <option key={code} value={code}>{label}</option>
    });

    let onChange = this.onChange.bind(this);

    return (
      <select onChange={onChange} className="choropleth">
        {options}
      </select>
    );

  }


  /**
   * When the code is changed.
   *
   * @param {Object} e
   */
  onChange(e) {
    this.props.showChoropleth(e.target.value);
  }


}
