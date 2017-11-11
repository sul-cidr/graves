

import React from 'react';

import Component from './component';
import Map from './map';
import Narrative from './narrative';
import TutorialModal from './tutorial-modal';


export default class extends Component {


  /**
   * Render the top-level application structure.
   */
  render() {
    return (
      <div className="wrapper">
        <Map />
        <Narrative />
        <TutorialModal />
      </div>
    );
  }


}
