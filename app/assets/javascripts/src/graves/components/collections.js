

import L from 'leaflet';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/collections';
import Collection from './collection';
import CollectionHighlighter from './collection-highlighter';


@connect(state => ({
  features: state.collections.features
}))
export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Create the feature group, request collections.
   */
  componentWillMount() {

    this.idMap = {};

    // Create group.
    this.group = L.featureGroup();
    this.group.addTo(this.context.map);

    // HIGHLIGHT
    this.group.on('mouseover', e => {
      this.props.dispatch(actions.highlightCollection(
        e.layer.options.id
      ));
    });

    // UNHIGHLIGHT
    this.group.on('mouseout', e => {
      this.props.dispatch(actions.unhighlightCollection());
    });

    // Request provinces.
    this.props.dispatch(actions.loadCollections());

  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {

      // Filter out un-geocoded collections.
      if (!f.geojson) return;

      // Is the province highlighted?
      let highlighted = (f.id == this.props.highlighted);

      return (
        <Collection
          key={f.id}
          group={this.group}
          idMap={this.idMap}
          feature={f}
        />
      );

    });

    return (
      <span className="collections">

        <CollectionHighlighter idMap={this.idMap} />

        <span>
          {features}
        </span>

      </span>
    );

  }


}
