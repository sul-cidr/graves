

import _ from 'lodash';
import React, { PropTypes } from 'react';
import moment from 'moment';

import Component from './component';


export default class extends Component {


  static propTypes = {
    field: PropTypes.string.isRequired,
    date: PropTypes.string,
  };


  /**
   * Render a date field.
   */
  render() {

    if (this.props.date) {

      let date = moment(this.props.date)
        .format('MMMM D, YYYY');

      return (
        <div className="field date">
          <span className="field">{this.props.field}</span>:{' '}
          <span className="value">{date}</span>
        </div>
      );

    }

    else return null;

  }


}
