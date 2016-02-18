

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import classNames from 'classnames';

import * as actions from '../actions/collections';


@connect(

  state => ({
    feature: state.collections.selected,
    show: state.collections.showModal,
  }),

  actions

)
export default class extends Component {


  /**
   * Render a collection modal.
   */
  render() {

    if (this.props.feature) {

      let cx = classNames(`collection-${this.props.feature.id}`);

      return (

        <Modal
          show={this.props.show}
          onHide={this.onHide.bind(this)}
          className={cx}
        >

          <Modal.Header closeButton>
            <Modal.Title>Collection</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          </Modal.Body>

        </Modal>

      );

    }

    else return null;

  }


  /**
   * Close the modal.
   */
  onHide() {
    this.props.unselectCollection();
  }


}
