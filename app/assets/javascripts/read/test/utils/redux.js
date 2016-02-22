

import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';


/**
 * Find a component by type.
 *
 * @param {Function} type
 */
export function getComponent(type) {
  let component = TestUtils.findRenderedComponentWithType(READ, type);
  return _.get(component, 'refs.wrappedInstance') || component;
}
