

import React from 'react';
import RadioComponent from '../lib/radio-component';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'highlight-line'


  static events = {
    collections: {
      HIGHLIGHT_COLLECTION: 'show',
      UNHIGHLIGHT_COLLECTION: 'hide',
    }
  }


  /**
   * Show the line.
   */
  show() {
    console.log('show');
  }


  /**
   * Hide the line.
   */
  hide() {
    console.log('hide');
  }


  /**
   * Render highlight line.
   */
  render() {
    return (
      <svg></svg>
    );
  }


}
