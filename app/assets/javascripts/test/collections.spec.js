

import 'jasmine-jquery';

import L from 'leaflet';
import $ from 'jquery';
import CollectionGroup from '../src/components/collection-group';
import * as utils from './utils';

// FIXTURES
import markersJSON from './fixtures/collections/markers.json';
import tooltipsJSON from './fixtures/collections/tooltips.json';


describe('Collections', function() {

  let group;

  beforeEach(function() {
    let app = utils.start();
    group = utils.unwrap(app, CollectionGroup);
  });

  afterEach(function() {
    utils.stop();
  });

  it('requests collections on startup', function() {

    // Get the collections request.
    let req = jasmine.Ajax.requests.filter(/collections/)[0];

    expect(req.method).toEqual('GET');
    expect(req.url).toEqual('/api/collections.json');

  });

  it('displays markers on the map', function() {

    // Inject the fixture.
    utils.respondCollections(markersJSON);

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

  describe('shows a tooltip on hover', function() {

    beforeEach(function() {
      utils.respondCollections(tooltipsJSON);
    });

    it('uses the town as the label, when possible', function() {

      // Hover on collection with town.
      group.group.fire('mouseover', {
        layer: group.idToLayer[1]
      });

      expect($('.leaflet-popup-content')).toHaveText('town');

    });

    it('uses the county as the label, when possible', function() {

      // Hover on collection with county.
      group.group.fire('mouseover', {
        layer: group.idToLayer[2]
      });

      expect($('.leaflet-popup-content')).toHaveText('county');

    });

    it('falls back to the province as the label', function() {

      // Hover on collection with province.
      group.group.fire('mouseover', {
        layer: group.idToLayer[3]
      });

      expect($('.leaflet-popup-content')).toHaveText('province');

    });

  });

  it('hides the tooltip on blur');
  it('shows metadata on click');

});
