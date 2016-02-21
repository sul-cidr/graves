

import React from 'react';

import Component from './component';
import Map from './map';
import Narrative from './narrative';


export default class extends Component {


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <div className="wrapper">
        <Map />
        <Narrative />
      </div>
    );
  }


}
