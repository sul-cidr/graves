

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


/**
 * Respond 200 to a request.
 *
 * @param {FakeXMLHttpRequest} req
 * @param {String} res
 */
export function respond200(req, res) {
  req.respondWith({
    status: 200,
    responseText: res,
  });
}


/**
 * Inject a collections fixture.
 *
 * @param {String} res
 */
export function respondCollections(res) {
  let req = jasmine.Ajax.requests.filter(/collections/)[0];
  respond200(req, res);
}
