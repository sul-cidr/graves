

import TestUtils from 'react-addons-test-utils';


/**
 * Close the collection modal.
 */
export function closeCollectionModal() {
  TestUtils.Simulate.click(document.querySelector(
    '.modal button.close'
  ));
}


/**
 * Open the base layer dropdown select.
 */
export function openBaseLayerSelect() {
  TestUtils.Simulate.mouseDown(document.querySelector(
    '.base-layer-select .Select-control'
  ));
}


/**
 * Open the WMS layer dropdown select.
 */
export function openWmsLayerSelect() {
  TestUtils.Simulate.mouseDown(document.querySelector(
    '.wms-layer-select .Select-control'
  ));
}
