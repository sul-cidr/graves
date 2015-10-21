

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

    // Bind event / request mappings
    this._bindEvents();
    this._bindRequests();

  }


  /**
   * Bind event mappings.
   */
  _bindEvents() {

    this.eventChannels = [];

    _.each(this.constructor.events, (bindings, channelName) => {

      // Connect to channel.
      let channel = Radio.channel(channelName);

      // Bind events -> callbacks.
      _.each(bindings, (method, event) => {
        channel.on(event, this[method], this);
      });

      this.eventChannels.push(channel);

    });

  }


  /**
   * Bind request mappings to the local channel.
   */
  _bindRequests() {

    if (this.constructor.channelName) {

      let name = this.constructor.channelName;

      // Set local channel.
      if (_.isString(name)) {
        this.requestChannel = Radio.channel(name);
      } else {
        throw new Error('Missing channel.');
      }

      // Bind requests -> callbacks.
      _.each(this.constructor.requests, (method, request) => {
        this.requestChannel.reply(request, this[method], this);
      });

    }

  }


  /**
   * Clean up event listeners.
   */
  componentWillUnmount() {

    // Unbind requests.
    this.requestChannel.off(null, null, this);

    // Unbind events.
    for (let c of this.eventChannels) {
      c.off(null, null, this);
    }

  }


  render() {
    return null;
  }


}
