

import _ from 'lodash';
import $ from 'jquery';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Mousetrap from 'mousetrap';
import classNames from 'classnames';

import Component from './component';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  };


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
   * Update lonlat when the cursor moves.
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
   * Freeze and select the lonlat.
   */
  onClick() {
    this.setState({ frozen: true });
    $(findDOMNode(this)).select();
  }


  /**
   * Unfreeze and "bounce" the lonlat.
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
   * Unfreeze the lonlat.
   */
  onEscape() {
    this.setState({ frozen: false });
  }


  /**
   * Render the cursor position.
   */
  render() {

    let cx = classNames('animated', {
      bounceIn: this.state.bounce
    });

    return (
      <input
        id="copy-lonlat"
        className={cx}
        value={`${this.state.lon},${this.state.lat}`}
        readOnly
      />
    );

  }


}
