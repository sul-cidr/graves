

import React from 'react';
import Toggle from 'react-toggle';

import Component from './component';


export default class extends Component {


  /**
   * Render the widget toggles.
   */
  render() {
    return (
      <div id="toggles">

        <label>
          <Toggle />
          <span className="label-text">Map Options</span>
        </label>

      </div>
    );
  }


}
