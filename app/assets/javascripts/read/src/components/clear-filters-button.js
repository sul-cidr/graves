

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/filters';

import Component from './component';


@connect(null, actions)
export default class extends Component {


  static propTypes = {
    clearFilters: PropTypes.func.isRequired,
  };


  /**
   * Render the "Clear Filters" button.
   */
  render() {
    return (
      <div id="clear-filters">

        <button
          className="btn btn-xs btn-danger"
          onClick={this.props.clearFilters}>

          <i className="fa fa-times"></i>{' '}
          Clear all filters

        </button>

      </div>
    );
  }


}
