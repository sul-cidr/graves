

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => ({
  start: state.filters.startDate,
  end: state.filters.endDate,
}))
export default class extends Component {


  static propTypes = {
    group: PropTypes.object.isRequired,
    idToMarker: PropTypes.object.isRequired,
    start: PropTypes.object,
    end: PropTypes.object,
  };


  /**
   * Filter by date.
   */
  componentDidUpdate() {

    if (this.props.start && this.props.end) {

      _.each(this.props.idToMarker, (m, id) => {

        let date = m.options.date;

        // Show if inside date range.
        if (date.isAfter(this.props.start) &&
            date.isBefore(this.props.end)) {

          this.props.group.addLayer(m);

        }

        // Otherwise, hide.
        else {
          this.props.group.removeLayer(m);
        }

      });

    }

  }


}
