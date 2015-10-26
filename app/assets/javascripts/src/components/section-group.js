

import $ from 'jquery';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import SectionLayer from './section-layer';

import {
  HIGHLIGHT_SECTION,
  UNHIGHLIGHT_SECTION,
} from '../constants';


@connect(state => ({
  sections: state.sections.attrs
}))
export default class extends Component {


  static events = {
    sections: {
      [HIGHLIGHT_SECTION]: 'highlight',
      [UNHIGHLIGHT_SECTION]: 'unhighlight',
    }
  }


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


  /**
   * Apply a highlight.
   *
   * @param {Number} id
   */
  highlight(id) {

    let layers = this.idToLayers[id];

    // Add `highlight`.
    let label = $(layers.label._icon);
    label.addClass('highlight');

  }


  /**
   * Remove a highlight.
   *
   * @param {Number} id
   */
  unhighlight(id) {

    let layers = this.idToLayers[id];

    // Remove `highlight`.
    let label = $(layers.label._icon);
    label.removeClass('highlight');

  }


}
