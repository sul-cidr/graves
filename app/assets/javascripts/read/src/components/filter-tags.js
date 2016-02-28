

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

    // If a tag filter is set, just show collections that are tagged with at
    // least one of the requested tags.

    if (this.props.tags) {

      _.each(this.props.idToMarker, (m, id) => {

        let list = m.options.feature.properties.tag_list;

        if (_.intersection(this.props.tags, list).length) {
          this.props.group.addLayer(m);
        }

        else {
          this.props.group.removeLayer(m);
        }

      });

    }

  }


}
