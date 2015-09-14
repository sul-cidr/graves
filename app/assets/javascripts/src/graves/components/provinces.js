

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/provinces';
import Province from './province';


@connect(state => (state.provinces))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    features: PropTypes.array.isRequired,
    highlighted: PropTypes.any,
  }


  /**
   * Create the feature group, request provinces.
   */
  componentWillMount() {

    // Create group.
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.dispatch(actions.highlightProvince(
        e.layer.options.id
      ));
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.dispatch(actions.unhighlightProvince());
    });

    // Request provinces.
    this.props.dispatch(actions.loadProvinces());

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {

      // Is the province highlighted?
      let highlighted = (f.id == this.props.highlighted);

      return (
        <Province
          key={f.id}
          group={this.group}
          feature={f}
          highlighted={highlighted}
        />
      );

    });

    return (
      <noscript className="provinces">
        {features}
      </noscript>
    );

  }


}
