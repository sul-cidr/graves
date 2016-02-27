

import React, { PropTypes } from 'react';

import Component from './component';
import BaseLayerSelect from './base-layer-select';
import WmsLayerSelect from './wms-layer-select';
import ChoroplethSelect from './choropleth-select';


export default class extends Component {


  /**
   * Render the map burger menu.
   */
  render() {
    return (
      <div id="map-menu">

        <h4>Base Layer</h4>
        <BaseLayerSelect />

        <h4>Demographic Overlay</h4>
        <ChoroplethSelect />

        <h4>Historical Overlay</h4>
        <WmsLayerSelect />

      </div>
    );
  }


}
