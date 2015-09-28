

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';


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
      flash: false,
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

    this.context.map.on('click', () => {
      this.bounce();
    });

  }


  /**
   * "Bounce" the lon/lat display.
   */
  bounce() {

    this.setState({ flash: true });

    setTimeout(() => {
      this.setState({ flash: false });
    }, 1000);

  }


  /**
   * Render the cursor position.
   */
  render() {

    let cx = classNames('lonlats', 'animated', {
      bounceIn: this.state.flash
    });

    return (
      <div className={cx}>
        {this.state.lon}, {this.state.lat}
      </div>
    );

  }


}
