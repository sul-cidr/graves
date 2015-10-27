

import _ from 'lodash';
import $ from 'jquery';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import SectionLayer from './section-layer';

import {
  SECTIONS,
  MAP,
  SCROLL_SECTION,
} from '../constants';

import {
  selectSection
} from '../events/sections';


@connect(state => ({
  sections: state.sections.attrs
}))
export default class extends Component {


  static events = {
    [SECTIONS]: {
      [SCROLL_SECTION]: 'highlight'
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

    this.idToLabel = {};

    // Label group.
    this.labels = L.featureGroup();
    this.labels.addTo(this.context.map);

    // Box group.
    this.boxes = L.featureGroup();
    this.boxes.addTo(this.context.map);

    // Select section.
    this.labels.on('click', e => {
      selectSection(e.layer.options.id, MAP);
    });

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.sections.map(s => {
      return (
        <SectionLayer
          key={s.id}
          labels={this.labels}
          boxes={this.boxes}
          idToLabel={this.idToLabel}
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
   * Highlight the scrolled-to section.
   *
   * @param {Number} id
   */
  highlight(id) {

    _.each(this.idToLabel, label => {
      $(label._icon).toggleClass('highlight', label.options.id == id);
    });

  }


}
