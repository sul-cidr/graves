

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import * as actions from '../actions/narrative';

import Component from './component';
import Spinner from './spinner';
import SectionMarkup from './section-markup';
import CollectionMarkup from './collection-markup';
import AnchorMarkup from './anchor-markup';


@connect(
  state => (state.narrative),
  actions
)
export default class extends Component {


  static propTypes = {
    slug: PropTypes.string.isRequired,
  };


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
  componentDidUpdate(prevProps) {

    // When the narrative is switched.
    if (prevProps.slug != this.props.slug) {
      this.setState({ markup: null });
      this.props.loadNarrative(this.props.slug);
    }

    // After new markup has been rendered.
    else if (!this.state.markup && this.refs.markup) {
      this.setState({
        markup: findDOMNode(this.refs.markup)
      });
    }

  }


  /**
   * Render a narrative.
   */
  render() {

    if (this.props.loading) {
      return <Spinner />;
    }

    else return (
      <div id="narrative">

        <header>
          <h1 className="title">{this.props.model.title}</h1>
          <p className="byline">By {this.props.model.author}</p>
        </header>

        <div ref="markup" dangerouslySetInnerHTML={{
          __html: this.props.model.markup
        }} />

        {this.getBehaviors()}

      </div>
    );

  }


  /**
   * Render narrative behaviors.
   */
  getBehaviors() {

    let behaviors = null;

    // Mount behaviors when the markup renders.
    if (this.state.markup) {
      behaviors = (
        <span>
          <SectionMarkup markup={this.state.markup} />
          <CollectionMarkup markup={this.state.markup} />
          <AnchorMarkup markup={this.state.markup} />
        </span>
      );
    }

    return behaviors;

  }


}
