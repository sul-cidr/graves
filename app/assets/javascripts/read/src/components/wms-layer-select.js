

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as actions from '../actions/wms-layer';

import Component from './component';


@connect(
  state => state.wmsLayer,
  actions,
)
export default class extends Component {


  static propTypes = {
    changeWmsLayer: PropTypes.func.isRequired,
  };


  /**
   * Render the base layer select.
   */
  render() {

    let options = _.map(window.GRAVES.wmsLayers, function(layer) {
      return {
        value: layer.id,
        label: layer.name,
      };
    });

    return (
      <Select

        className="wms-layer-select"
        placeholder="Select an overlay map"

        options={options}

        onChange={this.onChange.bind(this)}
        value={this.props.layerId}

      />
    );

  }


  /**
   * When the base layer is changed.
   *
   * @param {Object} option
   */
  onChange(option) {
    let id = option ? option.value : null;
    this.props.changeWmsLayer(id);
  }


}
