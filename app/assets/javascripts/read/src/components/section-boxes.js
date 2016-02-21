

import _ from 'lodash';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';


@connect(
  state => ({
    sections: state.sections.attrs
  })
)
export default class extends Component {


  static propTypes = {
    map: PropTypes.object.isRequired,
  };


  /**
   * Initialize the feature groups.
   */
  componentWillMount() {

    // Box group.
    this.boxes = L.featureGroup();
    this.boxes.addTo(this.props.map);

  }


  render() {

    if (this.props.sections) {

      // Clear existing markers.
      this.boxes.clearLayers();

      _.each(this.props.sections, s => {
        console.log(s);
      });

    }

    return null;

  }


}
