

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Component from './component';


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
    return (this.props.chinese || this.props.pinyin) ? (

      <div className="field translated">

        <span className="field">{this.props.field}</span>:{' '}

        {
          this.props.pinyin ?
          <span className="value">{this.props.pinyin}</span> :
          null
        }

        {
          this.props.chinese ?
          <span className="value">{this.props.chinese}</span> :
          null
        }

      </div>

    ) : null;
  }


}
