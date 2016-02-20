

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import classNames from 'classnames';

import * as actions from '../actions/collections';
import FieldNumeric from './field-numeric';


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

      let c = this.props.feature.properties;

      return (

        <Modal

          id={`collection-${this.props.feature.id}`}
          className="collection"

          show={this.props.show}
          onHide={this.onHide.bind(this)}

        >

          <Modal.Header closeButton>
            <Modal.Title>
              Collection #{this.props.feature.id}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <FieldNumeric
              field="Number of Graves Relocated"
              value={c.num_graves}
            />

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
