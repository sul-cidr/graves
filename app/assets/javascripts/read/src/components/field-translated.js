

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';


export default class extends Component {


  static propTypes = {
    field: PropTypes.string.isRequired,
    chinese: PropTypes.string,
    pinyin: PropTypes.string,
  };


  /**
   * Render an English/Pinyin field.
   */
  render() {
    return (this.props.chinese && this.props.pinyin) ? (

      <div className="field">

        <span className="field">{this.props.field}</span>:{' '}

        <span className="value">
          <span className="pinyin">{this.props.pinyin}</span>{' '}
          <span className="chinese">{this.props.chinese}</span>
        </span>

      </div>

    ) : null;
  }


}
