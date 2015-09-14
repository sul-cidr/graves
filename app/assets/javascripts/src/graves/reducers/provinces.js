

import _ from 'lodash';
import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  features: [],
  highlighted: null,
  loading: false,
};


const handlers = {

  [constants.REQUEST_PROVINCES]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_PROVINCES]: (state, action) => ({
    features: action.features,
    loading: false,
  }),

  [constants.HIGHLIGHT_PROVINCE]: (state, action) => ({
    highlighted: action.id,
  }),

  [constants.UNHIGHLIGHT_PROVINCE]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
