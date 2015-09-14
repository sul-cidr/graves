

import _ from 'lodash';


/**
 * Map action types to handlers.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 */
export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {

    if (_.has(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }

  };
}
