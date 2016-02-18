

import CollectionMarkers from '../../src/components/collection-markers';

import * as utils from '../utils';


import addMarkersJSON from
'../fixtures/collection-markers/add-markers.collections.json';


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


});
