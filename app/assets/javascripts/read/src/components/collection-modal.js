

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'


@connect(
  state => ({
    feature: state.collections.selected
  })
)
export default class extends Component {


  /**
   * Render a collection modal.
   */
  render() {

    if (this.props.feature) {

      return (

        <Modal show={true}>

          <Modal.Header>
            <Modal.Title>Collection</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          </Modal.Body>

        </Modal>

      );

    }

    else return null;

  }


}
