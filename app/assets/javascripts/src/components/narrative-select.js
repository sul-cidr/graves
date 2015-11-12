

import React, { Component } from 'react';
import Select from 'react-select';


export default class extends Component {


  /**
   * Render the narrative select.
   */
  render() {

    let narratives = window.GRAVES.narratives.map(function(n) {

      let label = (
        <div>
          <h6>{n.title}</h6>
          <small>{n.blurb}</small>
        </div>
      );

      return {
        value: n.slug,
        label: label,
      };

    });

    return <Select
      options={narratives}
    />;

  }


}
