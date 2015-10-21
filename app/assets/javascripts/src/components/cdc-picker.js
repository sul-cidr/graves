

import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Select from 'react-select';

import Component from './component';
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
   * Render the CDC code select.
   */
  render() {

    let options = _.map(codes.counties, (label, code) => {
      return {
        value: code,
        label: label,
      }
    });

    let onChange = this.onChange.bind(this);

    return (
      <Select
        className="cdc-picker"
        options={options}
        value={this.props.code}
        onChange={onChange}
      />
    );

  }


  /**
   * When the code is changed.
   *
   * @param {String} code
   */
  onChange(code) {
    this.props.showChoropleth(code);
  }


}
