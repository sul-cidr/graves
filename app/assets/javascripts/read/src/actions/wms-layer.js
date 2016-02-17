

import {
  CHANGE_WMS_LAYER,
} from '../constants';


/**
 * Change the WMS layer.
 *
 * @param {Number} layerId
 */
export function changeWmsLayer(layerId) {
  return {
    type: CHANGE_WMS_LAYER,
    layerId,
  };
}
