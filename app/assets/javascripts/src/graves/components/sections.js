

import $ from 'jquery';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    markup: PropTypes.object.isRequired,
  }


  /**
   * TODO
   */
  componentDidMount() {
    this.$el = $(this.props.markup);
    console.log(this.$el);
  }


  render() {
    return null;
  }


}
