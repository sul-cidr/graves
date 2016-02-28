

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(state => ({
  tags: state.filters.tags
}))
export default class extends Component {


  static propTypes = {
    group: PropTypes.object.isRequired,
    idToMarker: PropTypes.object.isRequired,
    tags: PropTypes.array,
  };


  /**
   * Filter by tags.
   */
  componentDidUpdate() {

    if (this.props.tags) {

      _.each(this.props.idToMarker, (m, id) => {

        let list = m.options.feature.properties.tag_list;

        // If the collection has at least one of the filter tags, show it.
        if (_.intersection(this.props.tags, list).length) {
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
