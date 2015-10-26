

import $ from 'jquery';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import SectionLayer from './section-layer';


@connect(state => ({
  sections: state.sections.attrs
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    sections: PropTypes.array.isRequired,
  }


  /**
   * Initialize the feature group and id map.
   */
  componentWillMount() {

    this.idToLayers = {};

    // Create group.
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.sections.map(s => {
      return (
        <SectionLayer
          key={s.id}
          group={this.group}
          idToLayers={this.idToLayers}
          data={s}
        />
      );
    });

    return (
      <span className="sections">
        {features}
      </span>
    );

  }


}
