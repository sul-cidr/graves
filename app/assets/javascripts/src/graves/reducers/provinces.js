

import _ from 'lodash';
import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  features: [],
  loading: false,
};


const handlers = {

  [constants.REQUEST_PROVINCES]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_PROVINCES]: (state, action) => ({
    features: action.provinces,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
