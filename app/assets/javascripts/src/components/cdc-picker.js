

import _ from 'lodash';
import React, { Component, findDOMNode } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/counties';
import codes from '../data/cdc-codes.yml';


@connect(
  state => ({
    code: state.counties.choropleth
  }),
  actions
)
export default class extends Component {


  /**
   * Render the initial value.
   */
  componentDidMount() {
    let code = findDOMNode(this).value;
    this.props.showChoropleth(code);
  }


  /**
   * Render the CDC code select.
   */
  render() {

    let options = _.map(codes.counties, (label, code) => {
      return <option key={code} value={code}>{label}</option>
    });

    let onChange = this.onChange.bind(this);

    return (
      <select
        className="choropleth"
        onChange={onChange}
        value={this.props.code}>
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
