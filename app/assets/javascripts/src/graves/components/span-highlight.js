

import $ from 'jquery';
import React, { Component, PropTypes, findDOMNode } from 'react';
import { connect } from 'react-redux';


@connect(state => ({
  highlighted: state.collections.highlighted,
}))
export default class extends Component {


  static propTypes = {
    markup: PropTypes.object.isRequired,
  }


  /**
   * Wrap the markup container.
   */
  componentDidMount() {
    this.$el = $(this.props.markup);
  }


  /**
   * Manifest the highlighted collection.
   *
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    console.log(this.$el);
  }


  render() {
    return null;
  }


}
