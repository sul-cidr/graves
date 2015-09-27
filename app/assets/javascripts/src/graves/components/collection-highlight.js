

import React, { Component, PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';
import styles from './collection.yml';

import {
  HIGHLIGHT_COLLECTION,
  UNHIGHLIGHT_COLLECTION,
} from '../constants';


export default class extends RadioComponent {


  static channelName = 'collection-highlight'


  static events = {
    collections: {
      HIGHLIGHT_COLLECTION: 'highlight',
      UNHIGHLIGHT_COLLECTION: 'unhighlight',
    }
  }


  static propTypes = {
    idToLayer: PropTypes.object.isRequired,
  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {

    let layer = this.props.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.hl);
    layer.openPopup();

  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {

    let layer = this.props.idToLayer[id];
    if (!layer) return;

    layer.setStyle(styles.path.def);
    layer.closePopup();

  }


  render() {
    return null;
  }


}
