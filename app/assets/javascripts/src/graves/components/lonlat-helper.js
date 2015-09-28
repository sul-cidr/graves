

import $ from 'jquery';
import React, { Component, PropTypes, findDOMNode } from 'react';
import Mousetrap from 'mousetrap';
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
      frozen: false,
      bounce: false,
      lon: 0,
      lat: 0,
    };

  }


  /**
   * Listen for cursor events.
   */
  componentDidMount() {

    this.context.map.on('mousemove', e => {

      if (!this.state.frozen) {
        this.setState({
          lon: e.latlng.lng.toFixed(3),
          lat: e.latlng.lat.toFixed(3),
        });
      }

    });

    this.context.map.on('click', () => {
      this.freeze();
    });

    Mousetrap.bind('escape', () => {
      this.unfreeze();
    });

    window.addEventListener('copy', e => {
      this.bounce();
      this.unfreeze();
    });

  }


  /**
   * Freeze and select the listing.
   */
  freeze() {
    this.setState({ frozen: true });
    $(findDOMNode(this)).select();
  }


  /**
   * Unfreeze the listing.
   */
  unfreeze() {
    this.setState({ frozen: false });
  }


  /**
   * "Bounce" the lon/lat display.
   */
  bounce() {

    this.setState({ bounce: true });

    setTimeout(() => {
      this.setState({ bounce: false });
    }, 1000);

  }


  /**
   * Render the cursor position.
   */
  render() {

    let cx = classNames('lonlats', 'animated', {
      bounceIn: this.state.bounce
    });

    return (
      <input
        className={cx}
        value={`${this.state.lon},${this.state.lat}`}
        readOnly
      />
    );

  }


}
