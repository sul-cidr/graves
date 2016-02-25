

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import BaseLayerSelect from './base-layer-select';
import WmsLayerSelect from './wms-layer-select';
import ChoroplethSelect from './choropleth-select';


@connect(state => ({
  show: state.widgets.mapMenu,
}))
export default class extends Component {


  static propTypes = {
    show: PropTypes.bool.isRequired,
  };


  /**
   * Render the map burger menu.
   */
  render() {
    return this.props.show ? (

      <div id="map-menu">
        <BaseLayerSelect />
        <ChoroplethSelect />
        <WmsLayerSelect />
      </div>

    ) : null;
  }


}
