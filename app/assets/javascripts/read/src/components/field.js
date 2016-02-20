

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    label: PropTypes.string.isRequired,
  };


  /**
   * Render a collection metadata field.
   */
  render() {

    return (
      <div className="field">

        <span className="field">{this.props.label}</span>:{' '}

        <span className="value">{this.props.value.toLocaleString()}</span>

      </div>
    );

  }


}
