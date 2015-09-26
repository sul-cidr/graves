

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

    // Highlight.
    if (!prevProps.highlighted && this.props.highlighted) {
      this.highlight(this.props.highlighted);
    }

    // Unhighlight.
    else if (prevProps.highlighted && !this.props.highlighted) {
      this.unhighlight(prevProps.highlighted);
    }

  }


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {
    this.getBurialsById(id).addClass('highlight');
  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {
    this.getBurialsById(id).removeClass('highlight');
  }


  /**
   * Get burial spans by id.
   *
   * @param {Number} id
   * @return {Object}
   */
  getBurialsById(id) {
    return this.$el.find(`span.burial[data-id=${id}]`)
  }


  render() {
    return null;
  }


}
