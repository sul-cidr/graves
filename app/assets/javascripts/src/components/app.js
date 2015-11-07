

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import Component from './component';
import Content from './content';
import Narrative from './narrative';
import Map from './map';


@connect(state => state.route)
export default class extends Component {


  static propTypes = {
    explore: PropTypes.bool.isRequired,
    narrative: PropTypes.any,
  }


  /**
   * Render the top-level application structure.
   */
  render() {

    let content = null;

    // Render a narrative, when one is active.
    if (this.props.narrative) {
      content = (
        <Content>
          <Narrative slug={this.props.narrative} />
        </Content>
      );
    }

    return (
      <div className="wrapper">
        <Map />
        {content}
      </div>
    );

  }


}
