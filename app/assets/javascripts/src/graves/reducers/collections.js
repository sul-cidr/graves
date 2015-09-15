

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

  [constants.HIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: action.id,
  }),

  [constants.UNHIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
