

import $ from 'jquery';

import CollectionMarkers from '../../src/components/collection-markers';

import * as utils from '../utils';


import showModalJSON from
'../fixtures/collection-modal/collections/show-modal.json';


describe('Collection Markers', function() {


  let markers;


  beforeEach(function() {
    utils.start();
    markers = utils.getComponent(CollectionMarkers);
  });


  afterEach(function() {
    utils.closeCollectionModal();
  });


  it('shows the metadata modal on click', function() {

    utils.respondCollections(showModalJSON);

    markers.group.fire('click', {
      layer: markers.idToMarker[1]
    });

    expect('#collection-1.modal').toBeVisible();

  });


});
