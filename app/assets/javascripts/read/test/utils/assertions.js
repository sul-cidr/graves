

import WmsLayer from '../../src/components/wms-layer';
import BaseLayer from '../../src/components/base-layer';

import { getComponent } from './redux';


/**
 * Assert the tile URL of the current base layer.
 *
 * @param {String} url
 */
export function assertBaseLayerUrl(url) {

  // Get the <BaseLayer /> instance.
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
export function assertWmsLayerParams(address, layer) {

  // Get the <WmsLayer /> instance.
  let wmsLayer = getComponent(WmsLayer);

  expect(wmsLayer.props.map.hasLayer(wmsLayer.layer)).toBeTruthy();
  expect(wmsLayer.layer._url).toEqual(address);
  expect(wmsLayer.layer.wmsParams.layers).toEqual(layer);

}
