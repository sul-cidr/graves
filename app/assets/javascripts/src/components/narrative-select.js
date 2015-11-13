

import { connect } from 'react-redux';
import React, { Component } from 'react';
import Select from 'react-select';


@connect(state => ({
  value: state.route.narrative
}))
export default class extends Component {


  /**
   * Render the narrative select.
   */
  render() {

    let narratives = window.GRAVES.narratives.map(function(n) {

      let label = (
        <div className="narrative">
          <div className="title">{n.title}</div>
          <div className="author">{n.author}</div>
          <div className="blurb">{n.blurb}</div>
        </div>
      );

      return {
        label: label,
        value: n.slug,
        model: n,
      };

    });

    return <Select

      options={narratives}
      onChange={this.onChange.bind(this)}
      value={this.props.value}
      clearable={false}

      valueRenderer={function(op) {
        return op.model.title;
      }}

    />;

  }


  /**
   * When the narrative is changed.
   *
   * @param {Object} option
   */
  onChange(option) {
    let hash = option ? `read/${option.value}` : '';
    window.location.hash = hash;
  }


}
