

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import { unwrap } from './utils';


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
