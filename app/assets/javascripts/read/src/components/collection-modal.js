

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
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
    nearby: state.collections.nearby,
  }),

  actions

)
export default class extends Component {


  static propTypes = {
    feature: PropTypes.object,
    show: PropTypes.bool.isRequired,
  };

  closeAndOpen(near) {
    this.onHide();
    this.props.selectCollection(near.options.feature, this.props.nearby);
  }

  markerClasses(num_graves) {
    let classes = 'collection'
    if (!num_graves) {
      classes += ' no-count'
    }
    return classes;
  }


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
              <span id="title-location">
                {c.province_p}{' '} {c.province_c}
                {c.county_p &&
                 ', '
                }
                {c.county_p}{' '}
                {c.county_c}
                {c.town_p &&
                 ', '
                }
                {c.town_p}{' '}
                {c.town_c}
              </span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <FieldNumeric
              field="Number of Graves Relocated"
              value={c.num_graves}
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

            Grave Collection #{this.props.feature.id}
          </Modal.Body>

          { this.props.nearby.length > 1 &&
            <Modal.Header>
              <Modal.Title componentClass='h5'>
                Graves nearby
              </Modal.Title>
            </Modal.Header>
          }

          <Modal.Body>
            {this.props.nearby.map((near) => {
              if (near.options.feature.id !== this.props.feature.id) {
                return (
                  <div
                    className={"collection-container " + ( near.options.feature.properties.notice.deadline ? 'has-date' : 'no-date') + " " + ( near.options.feature.properties.num_graves ? 'has-num-graves' : 'no-num-graves' )}
                    key={near.options.feature.id}
                    onClick={this.closeAndOpen.bind(this, near)}
                  >
                    <div
                      className={"collection-marker " + ( near.options.feature.properties.notice.deadline ? 'has-date' : 'no-date') + " " + ( near.options.feature.properties.num_graves ? 'has-num-graves' : 'no-num-graves' )}
                    >
                      <div
                        className={this.markerClasses(near.options.feature.properties.num_graves)}
                        style={{ width: near.options.radius * 2, height: near.options.radius * 2 }}
                      />
                    </div>
                    <div className='collection-content'>

                      <div className='collection-text collection-date'>
                        <FieldDate
                        field="Relocation Deadline"
                        date={near.options.feature.properties.notice.deadline}
                        />
                      </div>

                      <div className='collection-text collection-title'>

                       {near.options.feature.properties.province_p}{' '} {near.options.feature.properties.province_c}
                       {near.options.feature.properties.county_p &&
                         ', '
                       }
                       {near.options.feature.properties.county_p}{' '}
                       {near.options.feature.properties.county_c}
                       {near.options.feature.properties.town_p &&
                         ', '
                       }
                       {near.options.feature.properties.town_p}{' '}
                       {near.options.feature.properties.town_c}

                      </div>
                      <div className='collection-text'>
                          <FieldNumeric
                            field="Number of Graves Relocated"
                            value={near.options.feature.properties.num_graves}
                          />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
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
