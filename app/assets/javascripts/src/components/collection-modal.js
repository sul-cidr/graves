

import _ from 'lodash';
import React from 'react';
import { Modal } from 'react-bootstrap'

import Component from './component';


export default class extends Component {


  /**
   * Render the collection metadata modal.
   */
  render() {
    return (
      <Modal show={true} onHide={this.onHide}>
        <h1>Collection</h1>
      </Modal>
    );
  }


  /**
   * Close the modal.
   */
  onHide() {
    console.log('close');
  }


}
