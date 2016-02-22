

import $ from 'jquery';

import BaseLayer from '../src/components/base-layer';
import WmsLayer from '../src/components/wms-layer';
import CollectionMarkers from '../src/components/collection-markers';


import { getComponent } from './utils/redux';


/**
 * Assert the tile URL of the current base layer.
 *
 * @param {String} url
 */
export function baseLayerUrl(url) {

  let baseLayer = getComponent(BaseLayer);

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

  let wmsLayer = getComponent(WmsLayer);

  expect(wmsLayer.props.map.hasLayer(wmsLayer.layer)).toBeTruthy();
  expect(wmsLayer.layer._url).toEqual(address);
  expect(wmsLayer.layer.wmsParams.layers).toEqual(layer);

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

  let markers = getComponent(CollectionMarkers);
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