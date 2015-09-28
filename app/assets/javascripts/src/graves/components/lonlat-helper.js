

import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      lon: 0,
      lat: 0,
    };

  }


  /**
   * Listen for cursor events.
   */
  componentDidMount() {
    // TODO
  }


  /**
   * Render the cursor position.
   */
  render() {
    return <h1>lonlat</h1>
  }


}
