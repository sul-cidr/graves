

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };


  /**
   * Render a numeric metadata field.
   */
  render() {

    return (
      <div className="field">
        <span className="field">{this.props.field}</span>:{' '}
        <span className="value">{this.props.value.toLocaleString()}</span>
      </div>
    );

  }


}
