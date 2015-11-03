

import TestUtils from 'react-addons-test-utils';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';


describe('Collections', function() {

  let group;

  beforeEach(function() {

    let app = start();
    group = TestUtils.findRenderedComponentWithType(app, CollectionGroup);
    console.log(group);

  });

  it('test1', function() {
    expect(true).toBe(true);
  });

  it('test2', function() {
    expect(true).toBe(true);
  });

});
