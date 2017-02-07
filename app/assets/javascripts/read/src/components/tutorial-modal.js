import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

import * as actions from '../actions/map';

import Component from './component';


@connect(

  state => ({
    show: state.map.showTutorialModal,
  }),

  actions

)
export default class extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
  };

  /**
   * Close the tutorial modal.
   */
  onHide() {
    this.props.closeTutorialModal();
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.onHide.bind(this)}
          className="tutorial-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Some text</h1>
            <p>More text</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
