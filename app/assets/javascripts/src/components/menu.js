

import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NarrativeSelect from './narrative-select';


@connect(state => ({
  narrative: state.route.narrative
}))
export default class extends Component {


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      scroll: null
    };

  }


  /**
   * Listen for window scroll.
   */
  componentDidMount() {

    $(window).scroll(e => {

      // Get window / doc heights.
      // TODO: Cache these?
      let dHeight = $(document).height();
      let wHeight = $(window).height();

      // Get the window scroll percentage.
      let top = $(window).scrollTop();
      let pct = top / (dHeight - wHeight);

      this.setState({ scroll: pct*100 });

    });

  }


  /**
   * Render the menu.
   */
  render() {

    // Close 'X'.
    let close = !this.props.narrative ? null : (
      <i
        className="fa fa-times close"
        onClick={this.onClose.bind(this)}
      ></i>
    );

    // Scroll progress.
    let scroll = !this.props.narrative ? null : (
      <div
        className="scroll"
        style={{ width: `${this.state.scroll}%` }}
      ></div>
    );

    return (
      <div id="menu">

        <a href="#read/no-room-for-the-dead" className="wordmark">
          <h1>
            <i className="fa fa-home"></i>{' '}
            Chinese Graves
          </h1>
        </a>

        <NarrativeSelect />

        {close}
        {scroll}

      </div>
    );

  }


  /**
   * Close the current narrative.
   */
  onClose() {
    window.location.hash = '';
  }


}
