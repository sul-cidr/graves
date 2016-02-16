

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';


@connect(
  state => state.baseLayer
)
export default class extends Component {


  static propTypes = {
    layerId: PropTypes.number.isRequired,
  };


  /**
   * Render the base layer select.
   */
  render() {

    let options = _.map(window.GRAVES.baseLayers, function(layer) {
      return {
        value: layer.id,
        label: layer.label,
      };
    });

    return (
      <Select
        options={options}
        value={this.props.layerId}
      />
    );

  }


}
