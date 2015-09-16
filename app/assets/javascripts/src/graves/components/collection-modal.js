

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/collections';


@connect(state => ({
  selected: state.collections.selected
}))
export default class extends Component {


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    selected: PropTypes.any,
  }


  /**
   * Display the collection detail modal.
   */
  render() {
    return (
      <Modal show={this.props.selected} onHide={this.close.bind(this)}>

        <Modal.Header closeButton>Heading</Modal.Header>

        <Modal.Body>
          <p>Test content.</p>
        </Modal.Body>

      </Modal>
    );
  }


  /**
   * Close modal (unselect collection).
   */
  close() {
    this.props.dispatch(actions.unselectCollection());
  }


}
