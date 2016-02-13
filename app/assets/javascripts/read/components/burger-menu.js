

import $ from 'jquery';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  /**
   * Add the body class.
   */
  componentDidMount() {
    $('body').addClass('menu');
  }


  /**
   * Render the burger menu.
   */
  render() {
    return (
      <div className="burger">
        {this.props.children}
      </div>
    );
  }


}
