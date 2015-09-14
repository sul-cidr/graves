

import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  features: [],
  highlighted: null,
  loading: false,
};


const handlers = {

  [constants.REQUEST_COLLECTIONS]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.features,
    loading: false,
  }),

};


export default createReducer(initialState, handlers);
