

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/narrative';
import Spinner from './spinner';


@connect(
  state => (state.narrative),
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
   * Render a narrative.
   */
  render() {

    if (this.props.loading) {
      return <Spinner />;
    }

    else return (
      <h1>Narrative</h1>
    );

  }


}
