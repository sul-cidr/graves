

import { combineReducers } from 'redux';


function provinces(state = {
  items: [],
  loading: false,
}, action) {

  switch (action.type) {

  case REQUEST_PROVINCES:
    return _.assign({}, state, {
      loading: true,
    });

  case RECEIVE_PROVINCES:
    return _.assign({}, state, {
      items: action.provinces,
      loading: false,
    });

  default:
    return state;

  }

}
