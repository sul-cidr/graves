

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as actions from '../actions/base-layer';

import Component from './component';


@connect(
  state => state.baseLayer,
  actions,
)
export default class extends Component {


  static propTypes = {
    changeBaseLayer: PropTypes.func.isRequired,
  };


  /**
   * Render the base layer select.
   */
  render() {

    let options = _.map(window.GRAVES.baseLayers, function(layer) {
      return {
        value: layer.id,
        label: layer.name,
      };
    });

    return (
      <Select

        className="base-layer-select"

        clearable={false}
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
    this.props.changeBaseLayer(option.value);
  }


}
