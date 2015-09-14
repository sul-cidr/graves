

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { loadProvinces } from '../actions/provinces';
import Province from './province';


@connect(state => (state.provinces))
export default class extends Component {


  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    features: PropTypes.array.isRequired,
  }


  /**
   * Load provinces.
   */
  componentDidMount() {
    this.props.dispatch(loadProvinces());
  }


  /**
   * Render the map container.
   */
  render() {

    let features = this.props.features.map(f => {
      return <Province key={f.id} feature={f} />;
    });

    return (
      <noscript className="provinces">
        {features}
      </noscript>
    );

  }


}
