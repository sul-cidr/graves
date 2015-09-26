

import React, { Component } from 'react';


export default class extends Component {


  /**
   * Render content container.
   */
  render() {
    return (
      <div className="content left">
        {this.props.children}
      </div>
    );
  }


}
