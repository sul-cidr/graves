

import _ from 'lodash';
import React, { PropTypes } from 'react';
import Select from 'react-select';

import Component from './component';


export default class extends Component {


  /**
   * Render the choropleth select.
   */
  render() {

    // TODO
    let options = [];

    return (
      <Select
        className="choropleth-select"
        placeholder="Select a demographic variable"
        options={options}
      />
    );

  }


}
