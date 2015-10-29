

import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  }


  /**
   * Render a metadata field.
   */
  render() {
    return !this.props.value ? null : (
      <div className="field">

        <h5>{this.props.label}</h5>

        {this.props.children ? this.props.children : (
          <p>{this.props.value}</p>
        )}

      </div>
    );
  }


}
