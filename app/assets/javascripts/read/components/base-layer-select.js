

import React, { Component } from 'react';
import Select from 'react-select';


export default class extends Component {


  /**
   * Render the base layer select.
   */
  render() {

    let options = [
      {value: 1, label: 'Layer 1'},
      {value: 2, label: 'Layer 2'},
      {value: 3, label: 'Layer 3'},
    ];

    return (
      <Select
        options={options}
      />
    );

  }


}
