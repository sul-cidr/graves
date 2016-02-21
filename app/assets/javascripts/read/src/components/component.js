

import _ from 'lodash';
import React, { Component } from 'react';
import Radio from 'backbone.radio';


export default class extends Component {


  /**
   * Bind events and requests.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this._bindRequests();
    this._bindEvents();
  }


  /**
   * Bind request mappings.
   */
  _bindRequests() {

    this._requestChannels = [];

    _.each(this.constructor.requests, (bindings, channelName) => {

      let channel = Radio.channel(channelName);

      // Bind requests -> callbacks.
      _.each(bindings, (method, request) => {
        channel.reply(request, this[method], this);
      });

      this._requestChannels.push(channel);

    });

  }


  /**
   * Bind event mappings.
   */
  _bindEvents() {

    this._eventChannels = [];

    _.each(this.constructor.events, (bindings, channelName) => {

      let channel = Radio.channel(channelName);

      // Bind events -> callbacks.
      _.each(bindings, (method, event) => {
        channel.on(event, this[method], this);
      });

      this._eventChannels.push(channel);

    });

  }


  /**
   * Clean up event / request listeners.
   */
  componentWillUnmount() {

    for (let c of this._requestChannels) {
      c.off(null, null, this);
    }

    for (let c of this._eventChannels) {
      c.off(null, null, this);
    }

  }


  render() {
    return null;
  }


}
