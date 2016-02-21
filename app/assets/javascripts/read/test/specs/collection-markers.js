

import $ from 'jquery';

import CollectionMarkers from '../../src/components/collection-markers';

import * as utils from '../utils';


import addMarkersJSON from
'../fixtures/collection-markers/collections/add-markers.json';

import showTooltipsJSON from
'../fixtures/collection-markers/collections/show-tooltips.json';


describe('Collection Markers', function() {


  let markers;


  beforeEach(function() {
    utils.start();
    markers = utils.getComponent(CollectionMarkers);
  });


  it('adds markers to the map', function() {

    utils.respondCollections(addMarkersJSON);

    expect(markers.group.getLayers().length).toEqual(3);

    expect(markers.idToMarker[1].getLatLng()).toEqual({
      lng: 1,
      lat: 2,
    });

    expect(markers.idToMarker[2].getLatLng()).toEqual({
      lng: 3,
      lat: 4,
    });

    expect(markers.idToMarker[3].getLatLng()).toEqual({
      lng: 5,
      lat: 6,
    });

  });


  describe('shows a tooltip on hover', function() {


    beforeEach(function() {
      utils.respondCollections(showTooltipsJSON);
    });


    it('uses the town as the label, when possible', function() {

      // Hover on collection with town.
      markers.group.fire('mouseover', {
        layer: markers.idToMarker[1]
      });

      expect($('.leaflet-popup-content')).toHaveText('town');

    });


    it('uses the county as the label, when possible', function() {

      // Hover on collection with county.
      markers.group.fire('mouseover', {
        layer: markers.idToMarker[2]
      });

      expect($('.leaflet-popup-content')).toHaveText('county');

    });


    it('falls back to the province as the label', function() {

      // Hover on collection with province.
      markers.group.fire('mouseover', {
        layer: markers.idToMarker[3]
      });

      expect($('.leaflet-popup-content')).toHaveText('province');

    });


  });


});
