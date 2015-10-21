

import _ from 'lodash';
import React, { Component } from 'react';
import Radio from 'backbone.radio';


export default class extends Component {


  /**
   * Bind local channel, initialize.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this._bindRequests();
    this._bindEvents();
  }


  /**
   * Bind request mappings to the local channel.
   */
  _bindRequests() {

    let name = this.constructor.channelName;

    // Set local channel.
    if (_.isString(name)) {
      this._requestChannel = Radio.channel(name);
    }

    else if (this.constructor.requests) {
      throw new Error('Missing channel.');
    }

    // Bind requests -> callbacks.
    _.each(this.constructor.requests, (method, request) => {
      this._requestChannel.reply(request, this[method], this);
    });

  }


  /**
   * Bind event mappings.
   */
  _bindEvents() {

    this._eventChannels = [];

    _.each(this.constructor.events, (bindings, channelName) => {

      // Connect to channel.
      let channel = Radio.channel(channelName);

      // Bind events -> callbacks.
      _.each(bindings, (method, event) => {
        channel.on(event, this[method], this);
      });

      this._eventChannels.push(channel);

    });

  }


  /**
   * Clean up event listeners.
   */
  componentWillUnmount() {

    // Unbind requests.
    if (this._requestChannel) {
      this._requestChannel.off(null, null, this);
    }

    // Unbind events.
    for (let c of this._eventChannels) {
      c.off(null, null, this);
    }

  }


  render() {
    return null;
  }


}
