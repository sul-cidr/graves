

import 'jasmine-ajax';

import start from '../../src';
import CollectionGroup from '../../src/components/collection-group';
import * as utils from '../utils';

import displayMarkersJSON from './display-markers.json';


jasmine.Ajax.install();


describe('Collections', function() {

  let group;

  beforeEach(function() {
    let app = start();
    group = utils.unwrap(app, CollectionGroup);
  });

  it('requests collections on startup', function() {

    // Get the collections request.
    let req = jasmine.Ajax.requests.filter(/collections/)[0];

    expect(req.method).toEqual('GET');
    expect(req.url).toEqual('/api/collections.json');

  });

  it('displays markers on the map', function() {

    // Inject the fixture.
    let req = jasmine.Ajax.requests.filter(/collections/)[0];
    utils.respond200(req, displayMarkersJSON)

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
