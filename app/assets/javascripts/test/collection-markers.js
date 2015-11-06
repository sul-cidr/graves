

import 'jasmine-jquery';

import L from 'leaflet';
import $ from 'jquery';
import CollectionGroup from '../src/components/collection-group';
import * as utils from './utils';

import addMarkersJSON from
'./fixtures/collection-markers/add-markers.json';

import showTooltipJSON from
'./fixtures/collection-markers/show-tooltip.json';

import hideTooltipJSON from
'./fixtures/collection-markers/hide-tooltip.json';

import showModalJSON from
'./fixtures/collection-markers/show-modal.json';


describe('Collection Markers', function() {

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

  it('adds markers to the map', function() {

    // Inject the fixture.
    utils.respondCollections(addMarkersJSON);

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
      utils.respondCollections(showTooltipJSON);
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

  it('hides the tooltip on blur', function() {

    utils.respondCollections(hideTooltipJSON);

    // Hover.
    group.group.fire('mouseover', {
      layer: group.idToLayer[1]
    });

    // Blur.
    group.group.fire('mouseout', {
      layer: group.idToLayer[1]
    });

    expect($('.leaflet-popup')).not.toBeInDOM();

  });

  it('shows metadata on click', function() {

    utils.respondCollections(showModalJSON);

    // Select.
    group.group.fire('click', {
      layer: group.idToLayer[1]
    });

    expect($('.modal.collection')).toBeVisible();
    expect($('.modal-title')).toHaveText('Collection #1');

  });

});
