

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
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      show: false,
      feature: null,
    };

  }


  /**
   * Map the props into state.
   *
   * @param {Object} props
   */
  componentWillReceiveProps(props) {

    if (props.feature) {
      this.setState({
        show: true,
        feature: props.feature,
      });
    }

    else {
      this.setState({
        show: false
      });
    }

  }


  /**
   * Render the collection metadata modal.
   */
  render() {

    return !this.state.feature ? null : (
      <Modal show={this.state.show} onHide={this.onHide.bind(this)}>

        <Modal.Header closeButton>
          <Modal.Title>Collection #{this.state.feature.id}</Modal.Title>
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
