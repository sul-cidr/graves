

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    field: PropTypes.string.isRequired,
    date: PropTypes.string,
  };


  /**
   * Render a date field.
   */
  render() {
    return this.props.date  ? (

      <div className="field">
        <span className="field">{this.props.field}</span>:{' '}
        <span className="value">{this.props.date}</span>
      </div>

    ) : null;
  }


}
