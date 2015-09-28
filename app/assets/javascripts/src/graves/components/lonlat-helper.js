

import _ from 'lodash';
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

    _.bindAll(this, 'onMove', 'onClick', 'onCopy', 'onEscape');

  }


  /**
   * Listen for cursor events.
   */
  componentDidMount() {
    this.context.map.on('mousemove', this.onMove);
    this.context.map.on('click', this.onClick);
    window.addEventListener('copy', this.onCopy);
    Mousetrap.bind('escape', this.onEscape);
  }


  /**
   * Clean up event bindings.
   */
  componentWillUnmount() {
    this.context.map.off('mousemove', this.onMove);
    this.context.map.off('click', this.onClick);
    window.removeEventListener('copy', this.onCopy);
    Mousetrap.unbind('escape');
  }


  /**
   * When the mouse moves.
   *
   * @param {Object} e
   */
  onMove(e) {

    if (this.state.frozen) return;

    this.setState({
      lon: e.latlng.lng.toFixed(3),
      lat: e.latlng.lat.toFixed(3),
    });

  }


  /**
   * Freeze and select the listing.
   */
  onClick() {
    this.setState({ frozen: true });
    $(findDOMNode(this)).select();
  }


  /**
   * "Bounce" the lon/lat display.
   */
  onCopy() {

    if (!this.state.frozen) return;

    this.setState({ frozen: false });
    this.setState({ bounce: true });

    setTimeout(() => {
      this.setState({ bounce: false });
    }, 1000);

  }


  /**
   * Unfreeze on escape.
   */
  onEscape() {
    this.setState({ frozen: false });
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
