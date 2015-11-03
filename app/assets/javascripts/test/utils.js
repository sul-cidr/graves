

import TestUtils from 'react-addons-test-utils';


/**
 * Given a tree and a component class, find the first occurrence of the class
 * and return the raw component instance.
 *
 * @param {ReactComponent} tree
 * @param {Function} type
 */
export function unwrap(tree, type) {
  let component = TestUtils.findRenderedComponentWithType(tree, type);
  return component.refs.wrappedInstance;
}
