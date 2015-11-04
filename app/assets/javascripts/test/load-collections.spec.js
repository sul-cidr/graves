

import 'jasmine-ajax';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import { unwrap } from './utils';
import collections from './fixtures/collections.json';


jasmine.Ajax.install();


describe('Collections', function() {

  let group;

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
      responseText: collections,
    });

    expect(group.group.getLayers().length).toEqual(3);

    expect(group.idToLayer[1].getLatLng()).toEqual({
      lng: 1,
      lat: 2,
    });

    expect(group.idToLayer[2].getLatLng()).toEqual({
      lng: 3,
      lat: 4,
    });

    expect(group.idToLayer[3].getLatLng()).toEqual({
      lng: 5,
      lat: 6,
    });

  });

});
