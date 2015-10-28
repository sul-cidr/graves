

import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import { Modal } from 'react-bootstrap'

import Component from './component';
import * as actions from '../actions/collections';


@connect(
  state => ({
    feature: state.collections.selected
  }),
  actions
)
export default class extends Component {


  /**
   * Render the collection metadata modal.
   */
  render() {

    let show = Boolean(this.props.feature);

    return (
      <Modal show={show} onHide={this.onHide.bind(this)}>

        <Modal.Header closeButton>
          <Modal.Title>Collection</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Metadata.</p>
        </Modal.Body>

      </Modal>
    );

  }


  /**
   * Close the modal.
   */
  onHide() {
    this.props.unselectCollection();
  }


}
