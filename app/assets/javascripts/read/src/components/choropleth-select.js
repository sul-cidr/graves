

import _ from 'lodash';
import React, { PropTypes } from 'react';
import Select from 'react-select';

import Component from './component';
import codes from '../data/cdc-codes.yml';


export default class extends Component {


  /**
   * Render the choropleth select.
   */
  render() {

    let options = _.map(codes.counties, function(label, code) {
      return {
        value: code,
        label,
      };
    });

    return (
      <Select
        className="choropleth-select"
        placeholder="Select a demographic variable"
        options={options}
      />
    );

  }


}
