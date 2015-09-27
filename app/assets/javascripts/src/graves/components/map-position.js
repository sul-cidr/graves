

import React, { PropTypes } from 'react';
import RadioComponent from '../lib/radio-component';


export default class extends RadioComponent {


  static channelName = 'map'


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  /**
   * TODO
   */
  componentDidMount() {
    console.log(this.context.map);
  }


}
