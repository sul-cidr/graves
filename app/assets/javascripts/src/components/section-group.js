

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
  IS_SECTION_FOCUSED,
  SCROLL_SECTION,
  SELECT_SECTION,
} from '../constants';


@connect(state => ({
  sections: state.sections.attrs
}))
export default class extends Component {


  static events = {
    [SECTIONS]: {
      [SCROLL_SECTION]: 'highlight',
      [SELECT_SECTION]: 'select',
    }
  };


  static requests = {
    [MAP]: {
      [IS_SECTION_FOCUSED]: 'isFocused'
    }
  };


  static contextTypes = {
    map: PropTypes.object.isRequired
  };


  static propTypes = {
    sections: PropTypes.array.isRequired,
  };


  /**
   * Initialize the feature group and id map.
   */
  componentWillMount() {

    this.idToLabel = {};
    this.idToBox = {};

    // Label group.
    this.labels = L.featureGroup();
    this.labels.addTo(this.context.map);

    // Box group.
    this.boxes = L.featureGroup();
    this.boxes.addTo(this.context.map);

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
          idToBox={this.idToBox}
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


  /**
   * Select a section.
   *
   * @param {Number} id
   */
  select(id) {

    let box = this.idToBox[id];
    this.context.map.flyTo(box.getBounds().getCenter(), 7)

  }


  /**
   * Check to see if a section is focused.
   *
   * @param {Number} id
   * @return {Boolean}
   */
  isFocused(id) {

    // Get section and map centers.
    let sCenter = this.idToBox[id].getBounds().getCenter();
    let mCenter = this.context.map.getCenter();

    // Measure distance to center.
    let d = mCenter.distanceTo(sCenter);
    return d < 300000;

  }


}
