

import 'jasmine-ajax';

import start from '../src';
import CollectionGroup from '../src/components/collection-group';
import { unwrap } from './utils';


describe('Collections', function() {

  let group;

  beforeEach(function() {

    jasmine.Ajax.install();

    let app = start();
    group = unwrap(app, CollectionGroup);

  });

  it('requests collections on startup', function() {
    console.log(jasmine.Ajax.requests.count());
  });

});
