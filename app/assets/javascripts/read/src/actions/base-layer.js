

import {
  CHANGE_BASE_LAYER,
} from '../constants';


/**
 * Change the base layer.
 *
 * @param {Number} layerId
 */
export function changeBaseLayer(layerId) {
  return {
    type: CHANGE_BASE_LAYER,
    layerId,
  };
}
