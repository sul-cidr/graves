

import { connect } from 'react-redux';
import React from 'react';
import { Modal } from 'react-bootstrap'
import classNames from 'classnames';

import * as actions from '../actions/collections';

import Component from './component';
import Field from './field';
import FieldNumeric from './field-numeric';
import FieldTranslated from './field-translated';
import FieldDate from './field-date';


@connect(

  state => ({
    feature: state.collections.selected,
    show: state.collections.showModal,
  }),

  actions

)
export default class extends Component {


  /**
   * Render a collection modal.
   */
  render() {

    if (this.props.feature) {

      let c = this.props.feature.properties;

      return (

        <Modal

          id={`collection-${this.props.feature.id}`}
          className="collection"

          show={this.props.show}
          onHide={this.onHide.bind(this)}

        >

          <Modal.Header closeButton>
            <Modal.Title>
              Collection #{this.props.feature.id}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <FieldNumeric
              field="Number of Graves Relocated"
              value={c.num_graves}
            />

            <FieldTranslated
              field="Province"
              chinese={c.province_c}
              pinyin={c.province_p}
            />

            <FieldTranslated
              field="County"
              chinese={c.county_c}
              pinyin={c.county_p}
            />

            <FieldTranslated
              field="Township"
              chinese={c.town_c}
              pinyin={c.town_p}
            />

            <FieldDate
              field="Date of Grave Relocation Notice"
              date={c.notice.notice_date}
            />

            <FieldDate
              field="Deadline for Grave Relocation"
              date={c.notice.deadline}
            />

            <FieldTranslated
              field="Source"
              chinese={c.notice.site_c}
              pinyin={c.notice.site_p}
            />

            <FieldTranslated
              field="Source Title"
              chinese={c.notice.title_c}
              pinyin={c.notice.title_p}
            />

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
