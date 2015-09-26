

import { connect } from 'react-redux';
import React, { Component, PropTypes, findDOMNode } from 'react';
import * as actions from '../actions/narrative';
import Spinner from './spinner';
import SpanHighlight from './span-highlight';


@connect(
  state => (state.narrative),
  actions
)
export default class extends Component {


  static propTypes = {
    slug: PropTypes.string.isRequired,
  }


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { markup: null };
  }


  /**
   * Request the narrative.
   */
  componentDidMount() {
    this.props.loadNarrative(this.props.slug);
  }


  /**
   * Get the markup DOM when it first renders.
   */
  componentDidUpdate() {

    if (!this.state.markup && this.refs.markup) {
      let markup = findDOMNode(this.refs.markup);
      this.setState({ markup: markup });
    }

  }


  /**
   * Render a narrative.
   */
  render() {

    if (this.props.loading) {
      return <Spinner />;
    }

    else {

      let behaviors = null;

      // Mount behaviors when the markup renders.
      if (this.state.markup) {
        behaviors = <SpanHighlight markup={this.state.markup} />
      }

      return (
        <div className="narrative">

          <header>
            <h1 className="title">{this.props.model.title}</h1>
            <p className="byline">By {this.props.model.author}</p>
          </header>

          <div ref="markup" dangerouslySetInnerHTML={{
            __html: this.props.model.markup
          }} />

          {behaviors}

        </div>
      );

    }

  }


}
