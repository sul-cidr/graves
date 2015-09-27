

import Radio from 'backbone.radio';

import {
  MOVE_MAP,
} from '../constants';


const channel = Radio.channel('map');


/**
 * Notify map movement.
 */
export function moveMap() {
  channel.trigger(MOVE_MAP);
}
