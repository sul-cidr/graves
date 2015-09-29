

import _ from 'lodash';
import React, { Component } from 'react';
import codes from '../data/cdc-codes.yml';


export default class extends Component {


  /**
   * Render choropleth control.
   */
  render() {

    let options = _.map(codes.counties, (label, code) => {
      return <option value={code}>{label}</option>
    });

    return (
      <select className="choropleth">
        {options}
      </select>
    );

  }


}
