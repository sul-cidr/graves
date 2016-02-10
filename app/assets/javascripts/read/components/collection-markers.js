

import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../actions/collections';


@connect(null, actions)
export default class extends Component {


  /**
   * Initialize the feature group and ID map.
   */
  componentWillMount() {
    // TODO
  }


  /**
   * Request collections.
   */
  componentDidMount() {
    this.props.loadCollections();
  }


  render() {
    return null;
  }


}
