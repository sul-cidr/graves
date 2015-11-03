

import 'jasmine-ajax';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import { unwrap } from './utils';


describe('Collections', function() {

  let group;

  beforeEach(function() {

    jasmine.Ajax.install();

    let app = start();
    group = unwrap(app, CollectionGroup);

  });

  it('requests collections on startup', function() {

    let req = jasmine.Ajax.requests.filter(/collections/)[0];

    expect(req.method).toEqual('GET');
    expect(req.url).toEqual('/api/collections.json');

  });

});
