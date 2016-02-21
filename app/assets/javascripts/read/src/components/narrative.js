

import $ from 'jquery';
import React from 'react';

import Component from './component';
import SectionHTML from './section-html';


export default class extends Component {


  /**
   * Mount narrative behaviors.
   */
  render() {

    let container = $('#narrative');

    return (
      <behaviors>
        <SectionHTML container={container} />
      </behaviors>
    );

  }


}
