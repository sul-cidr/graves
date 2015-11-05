

import 'jasmine-ajax';
import ReactDOM from 'react-dom';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import * as utils from './utils';

import markersJSON from './fixtures/collections/markers.json';
import tooltipsJSON from './fixtures/collections/tooltips.json';


describe('Collections', function() {

  let group;

  beforeEach(function() {

    jasmine.Ajax.install();

    let app = start();
    group = utils.unwrap(app, CollectionGroup);

  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    jasmine.Ajax.uninstall();
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

    it('when a town is resolved', function() {
      console.log(group.idToLayer[1]);
    });

  });

});
