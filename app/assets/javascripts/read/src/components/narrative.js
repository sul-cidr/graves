

import $ from 'jquery';
import React from 'react';

import Component from './component';
import CollectionHTML from './collection-html';
import SectionHTML from './section-html';


export default class extends Component {


  /**
   * Mount narrative behaviors.
   */
  render() {

    let container = $('#narrative');

    return (
      <behaviors>
        <CollectionHTML container={container} />
        <SectionHTML container={container} />
      </behaviors>
    );

  }


}
