

import 'jasmine-ajax';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import { unwrap } from './utils';
import collections from './fixtures/collections.json';


describe('Collections', function() {

  let group;
  jasmine.Ajax.install();

  beforeEach(function() {

    let app = start();
    group = unwrap(app, CollectionGroup);

  });

  it('requests collections on startup', function() {

    let req = jasmine.Ajax.requests.filter(/collections/)[0];

    expect(req.method).toEqual('GET');
    expect(req.url).toEqual('/api/collections.json');

  });

  it('displays markers on the map', function() {

    let req = jasmine.Ajax.requests.filter(/collections/)[0];

    req.respondWith({
      status: 200,
      responseText: JSON.stringify(collections),
    });

    expect(group.group.getLayers().length).toEqual(3);

  });

});
