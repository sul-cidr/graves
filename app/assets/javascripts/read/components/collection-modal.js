

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import * as actions from '../actions/collections';


@connect(
  state => ({
    feature: state.collections.selected
  }),
  actions
)
export default class extends Component {


  /**
   * Render a collection modal.
   */
  render() {
    console.log(this.props.feature);
    return null;
  }


}
