

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
    this.context.map.on('mousemove', e => {
      this.setState({
        lon: e.latlng.lng.toFixed(3),
        lat: e.latlng.lat.toFixed(3),
      });
    });
  }


  /**
   * Render the cursor position.
   */
  render() {
    return (
      <div className="lonlats">
        {this.state.lon}, {this.state.lat}
      </div>
    );
  }


}
