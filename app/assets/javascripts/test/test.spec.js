

import TestUtils from 'react-addons-test-utils';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';


function unwrap(tree, type) {
  let component = TestUtils.findRenderedComponentWithType(tree, type);
  return component.refs.wrappedInstance;
}


describe('Collections', function() {

  let group;

  beforeEach(function() {

    let app = start();
    group = unwrap(app, CollectionGroup);

  });

  it('loads collections on startup', function() {
    expect(group.group.getLayers().length).toEqual(100);
  });

});
