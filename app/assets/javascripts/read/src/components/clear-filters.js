

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => state.filters)
export default class extends Component {


  static propTypes = {

    group: PropTypes.object.isRequired,
    idToMarker: PropTypes.object.isRequired,

    tags: PropTypes.array,
    startDate: PropTypes.object,
    endDate: PropTypes.object,

  };


  /**
   * Show all collections when the filters are cleared.
   */
  componentDidUpdate() {

    // When all filters are empty.
    if (
      !this.props.tags &&
      !this.props.startDate &&
      !this.props.endDate
    ) {

      // Show all collections.
      _.each(this.props.idToMarker, m => {
        this.props.group.addLayer(m);
      });

    }

  }


}
