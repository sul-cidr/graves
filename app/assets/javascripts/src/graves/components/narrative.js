

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/narrative';


@connect(
  state => ({
    model: state.narrative.model
  }),
  actions
)
export default class extends Component {


  static propTypes = {
    slug: PropTypes.string.isRequired,
  }


  /**
   * Request the narrative.
   */
  componentDidMount() {
    this.props.loadNarrative(this.props.slug);
  }


  /**
   * Render the splash screen.
   */
  render() {
    return (
      <h1>Narrative</h1>
    );
  }


}
