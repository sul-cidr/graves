

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
      <div className="narrative">

        <header>
          <h1 className="title">{this.props.model.title}</h1>
          <p className="byline">By {this.props.model.author}</p>
        </header>

        <div dangerouslySetInnerHTML={{
          __html: this.props.model.markup
        }} />

      </div>
    );

  }


}
