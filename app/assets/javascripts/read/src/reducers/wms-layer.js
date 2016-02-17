

import { createReducer } from '../utils';

import {
  CHANGE_WMS_LAYER,
} from '../constants';


const initialState = {
  layerId: null,
};


const handlers = {

  [CHANGE_WMS_LAYER]: (state, action) => ({
    layerId: action.layerId,
  }),

};


export default createReducer(initialState, handlers);
