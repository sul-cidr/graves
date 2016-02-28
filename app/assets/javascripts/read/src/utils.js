

import _ from 'lodash';


/**
 * Map action types to handlers.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 */
export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {

    // If a handler is provided for the current action, apply the reducer
    // and merge the result with the initial state.

    if (_.has(handlers, action.type)) {
      return {
        ...state,
        ...handlers[action.type](state, action),
      };
    }

    // Otherwise, return the intial state.

    else {
      return state;
    }

  };
}


/**
 * Extract and parse attributes from an element.
 *
 * @param {Object} $el
 * @param {Object} map
 * @return {Object}
 */
export function parseAttrs($el, map) {

  let attrs = {};

  _.each(map, (attr, key) => {

    // Attribute, no parser.
    if (_.isString(attr)) {
      attrs[key] = $el.attr(attr);
    }

    // Attribute + parser.
    else if (_.isArray(attr)) {

      let [name, parse] = attr;

      // Get the raw value.
      let value = $el.attr(name);

      // Apply parser, if provided.
      if (value && parse) {
        value = parse(value);
      }

      attrs[key] = value;

    }

  });

  return attrs;

}


/**
 * Parse a lon/lat string into an array.
 *
 * @param {Object} lonlat - "108.040,36.774"
 * @return {Array<Number>}
 */
export function parseLonLat(lonlat='') {
  return lonlat.split(',').map(Number);
}


/**
 * Swap lon/lat -> lat/lon, vice versa.
 *
 * @param {Array<Number>} coord
 * @return {Array<Number>}
 */
export function swap(coord) {
  return [coord[1], coord[0]];
}


/**
 * Parse a tags string.
 *
 * @param {String} value
 * @return {Array<String>}
 */
export function parseTags(value) {
  return value.replace(/\s/g, '').split(',');
}
