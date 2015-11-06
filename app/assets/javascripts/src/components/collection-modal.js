

import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import { Modal } from 'react-bootstrap'

import Component from './component';
import Field from './field';
import * as actions from '../actions/collections';


@connect(
  state => ({
    feature: state.collections.selected
  }),
  actions
)
export default class extends Component {


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      show: false,
      feature: null,
    };

  }


  /**
   * Map the props into state.
   *
   * @param {Object} props
   */
  componentWillReceiveProps(props) {

    if (props.feature) {
      this.setState({
        show: true,
        feature: props.feature,
      });
    }

    else {
      this.setState({
        show: false
      });
    }

  }


  /**
   * Render the collection metadata modal.
   */
  render() {

    if (this.state.feature) {

      let c = this.state.feature.properties;
      let n = c.notice;

      return (

        <Modal
          show={this.state.show}
          onHide={this.onHide.bind(this)}
          className="collection"
        >

          <Modal.Header closeButton>
            <Modal.Title>
              Collection #{this.state.feature.id}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Field value={c.location} label="Location" />
            <Field value={c.num_graves} label="Grave Count" />
            <Field value={c.destination} label="Destination" />
            <Field value={c.province_c} label="Province" />
            <Field value={c.province_p} label="Province (Pinyin)" />
            <Field value={c.county_c} label="County" />
            <Field value={c.county_p} label="County (Pinyin)" />
            <Field value={c.town_c} label="Town" />
            <Field value={c.town_p} label="Town (Pinyin)" />

            <Field value={n.pub_date} label="Publication Date" />
            <Field value={n.notice_date} label="Notice Date" />
            <Field value={n.deadline} label="Deadline" />
            <Field value={n.site_c} label="Site" />
            <Field value={n.site_p} label="Site (Pinyin)" />
            <Field value={n.title_c} label="Title" />
            <Field value={n.title_p} label="Title (Pinyin)" />
            <Field value={n.org_c} label="Organization" />
            <Field value={n.org_p} label="Organization (Pinyin)" />
            <Field value={n.contact_phone} label="Contact Phone" />
            <Field value={n.contact_c} label="Contact" />
            <Field value={n.contact_p} label="Contact (Pinyin)" />

            <Field value={n.url} label="URL">
              <a href={n.url}>Link</a>
            </Field>

          </Modal.Body>

        </Modal>
      );

    }

    else return null;

  }


  /**
   * Close the modal.
   */
  onHide() {
    this.props.unselectCollection();
  }


}
