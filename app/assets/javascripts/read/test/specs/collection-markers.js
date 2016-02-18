

import CollectionMarkers from '../../src/components/collection-markers';

import * as utils from '../utils';

// TODO|dev
import addMarkersJSON from
'fixtures/collection-markers/add-markers.collections.json';


describe('Collection Markers', function() {


  let markers;


  beforeEach(function() {
    utils.start();
    markers = utils.getComponent(CollectionMarkers);
  });


  it('adds markers to the map');


});
