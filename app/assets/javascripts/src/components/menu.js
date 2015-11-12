

import React, { Component } from 'react';
import Select from 'react-select';


export default class extends Component {


  /**
   * Render the menu.
   */
  render() {

    let narratives = [
      {
        value: 'n1',
        label: 'Narrative 1',
      },
      {
        value: 'n2',
        label: 'Narrative 2',
      },
      {
        value: 'n3',
        label: 'Narrative 3',
      },
      {
        value: 'n4',
        label: 'Narrative 4',
      },
    ];

    return (
      <div id="menu">

        <h1 className="wordmark">
          <i className="fa fa-home"></i>{' '}
          Chinese Graves
        </h1>

        <Select options={narratives} />

      </div>
    );

  }


}
