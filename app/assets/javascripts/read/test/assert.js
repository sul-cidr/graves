

import BaseLayer from '../src/components/base-layer';

import * as utils from './utils';


/**
 * Assert the tile URL of the current map base layer.
 *
 * @param {String} url
 */
export function baseLayerUrl(url) {

  let baseLayer = utils.unwrap(ROOT, BaseLayer);

  expect(baseLayer.props.map.hasLayer(baseLayer.layer)).toBeTruthy();
  expect(baseLayer.layer._url).toEqual('url3');

}
