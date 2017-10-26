

import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';

import BaseLayer from '../src/components/base-layer';
import WmsLayer from '../src/components/wms-layer';
import CollectionMarkers from '../src/components/collection-markers';
import TimeSlider from '../src/components/time-slider';


import * as utils from './utils';


/**
 * Assert the tile URL of the current base layer.
 *
 * @param {String} url
 */
export function baseLayerUrl(url) {

  let baseLayer = utils.getComponent(BaseLayer);

  expect(baseLayer.props.map.hasLayer(baseLayer.layer)).toBeTruthy();
  expect(baseLayer.layer._url).toEqual(url);

}


/**
 * Assert the address/layer of the current WMS layer.
 *
 * @param {String} address
 * @param {String} layer
 */
export function wmsLayerParams(address, layer) {

  let wmsLayer = utils.getComponent(WmsLayer);
  let pairs = _.map(Object.values(wmsLayer.layers), v => `${v._url}-${v.wmsParams.layers}`);
  let index = pairs.indexOf(`${address}-${layer}`);

  expect(index).not.toEqual(-1);
  expect(wmsLayer.props.map.hasLayer(Object.values(wmsLayer.layers)[index])).toBeTruthy();

}


/**
 * Assert the label text of the collection popup.
 *
 * @param {String} label
 */
export function popupLabel(label) {

  let content = $('.leaflet-popup-content');

  expect(content).toBeVisible();
  expect(content).toHaveText(label);

}


/**
 * Assert the id of the highlighted collection
 *
 * @param {Number} id
 */
export function highlightedCollectionId(id) {

  let markers = utils.getComponent(CollectionMarkers);
  let marker = markers.idToMarker[id];

  expect($(marker._path)).toHaveClass('highlight');

}


/**
 * Assert that no collection is currently highlighted.
 */
export function noCollectionHighlighted() {
  expect('.leaflet-popup').not.toExist();
  expect('path.collection.highlight').not.toExist();
}


/**
 * Assert the map focus center.
 *
 * @param {Number} eLon
 * @param {Number} eLat
 */
export function mapCenter(eLon, eLat) {

  let { lng, lat } = utils.getLeaflet().getCenter();

  expect(Math.round(lng)).toEqual(eLon);
  expect(Math.round(lat)).toEqual(eLat);

}


/**
 * Assert the map zoom level.
 *
 * @param {Number} level
 */
export function mapZoom(level) {
  expect(utils.getLeaflet().getZoom()).toEqual(level);
}


/**
 * Assert current choropleth code.
 *
 * @param {String} code
 */
export function choroplethCode(code) {
  expect('g.counties').toHaveAttr('data-code', code)
}


/**
 * Assert the time slider start / end dates.
 *
 * @param {String} start
 */
export function timeSliderExtent(start, end) {

  let slider = utils.getComponent(TimeSlider);

  expect(slider.brush.extent()).toEqual([
    moment('2008-01-01').toDate(),
    moment('2010-01-01').toDate(),
  ]);

}


/**
 * Assert the set of visible collection markers.
 *
 * @param {Array} ids
 */
export function visibleCollections(...ids) {

  let map = utils.getLeaflet();
  let markers = utils.getComponent(CollectionMarkers);

  _.each(markers.idToMarker, function(m, id) {
    expect(map.hasLayer(m)).toEqual(_.includes(ids, Number(id)));
  });

}
