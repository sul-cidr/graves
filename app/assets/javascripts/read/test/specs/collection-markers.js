

import $ from 'jquery';

import CollectionMarkers from '../../src/components/collection-markers';

import * as utils from '../utils';
import * as assert from '../assert';


import addMarkersJSON from
'../fixtures/collection-markers/collections/add-markers.json';

import showTooltipsJSON from
'../fixtures/collection-markers/collections/show-tooltips.json';

import highlightJSON from
'../fixtures/collection-markers/collections/highlight.json';


describe('Collection Markers', function() {


  let markers;


  beforeEach(function() {
    utils.start();
    markers = utils.getComponent(CollectionMarkers);
  });


  it('adds markers to the map', function() {

    utils.respondCollections(addMarkersJSON);

    expect(markers.group.getLayers().length).toEqual(4);

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

    expect(markers.idToMarker[4].getLatLng()).toEqual({
      lng: 7,
      lat: 8,
    });

  });

  it('adds markers to rtree that is searchable', function() {
    utils.respondCollections(addMarkersJSON);
    expect(markers.tree.collides({
      minX: 2,
      maxX: 4,
      minY: 3,
      maxY: 5,
    })).toBe(true)
  });


  describe('hover', function() {


    describe('shows the popup', function() {

      beforeEach(function() {
        utils.respondCollections(showTooltipsJSON);
      });

      it('uses the town as the label, when possible', function() {

        // Hover on collection with town.
        markers.group.fire('mouseover', {
          layer: markers.idToMarker[1]
        });

        assert.popupLabel('town');

      });

      it('uses the county as the label, when possible', function() {

        // Hover on collection with county.
        markers.group.fire('mouseover', {
          layer: markers.idToMarker[2]
        });

        assert.popupLabel('county');

      });

      it('falls back to the province as the label', function() {

        // Hover on collection with province.
        markers.group.fire('mouseover', {
          layer: markers.idToMarker[3]
        });

        assert.popupLabel('province');

      });

    });


    it('highlights the marker', function() {

      utils.respondCollections(highlightJSON);

      // Blur off the marker.
      markers.group.fire('mouseover', {
        layer: markers.idToMarker[1]
      });

      assert.highlightedCollectionId(1);

    });


  });


  describe('blur', function() {


    it('unhighlights the collection', function() {

      utils.respondCollections(highlightJSON);

      let marker = markers.idToMarker[1];

      // Hover on the marker.
      markers.group.fire('mouseover', {
        layer: marker
      });

      // Blur off the marker.
      markers.group.fire('mouseout', {
        layer: marker
      });

      assert.noCollectionHighlighted();

    });


  });

  describe('when no_marker is true', function() {

    let marker;

    beforeEach(function() {

      utils.respondCollections(highlightJSON);

      marker = markers.idToMarker[2];

    });

    it('does not show marker', function() {
      expect('path.collection.nomarker').toExist();
    });

    it('does not show popup', function() {

      markers.group.fire('mouseover', {
        layer: marker
      });

      // leaflet popup would be visible if a label was assigned to the marker
      expect('.leaflet-popup').not.toExist();
      // collection is highlighted but not visible by applying CSS classes
      expect('path.collection.nomarker.highlight').toExist();

      markers.group.fire('mouseout', {
        layer: marker
      });

      assert.noCollectionHighlighted();

    });

    it('does not show modal', function() {

      markers.group.fire('click', {
        layer: marker
      });

      expect('#collection-2.modal').not.toBeVisible();

    });


  });

});
