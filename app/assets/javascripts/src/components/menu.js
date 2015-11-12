

import React, { Component } from 'react';
import NarrativeSelect from './narrative-select';


export default class extends Component {


  /**
   * Render the menu.
   */
  render() {
    return (
      <div id="menu">

        <h1 className="wordmark">
          <i className="fa fa-home"></i>{' '}
          Chinese Graves
        </h1>

        <NarrativeSelect />

      </div>
    );
  }


}
