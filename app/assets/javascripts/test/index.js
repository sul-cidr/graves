

import 'jasmine-jquery';
import * as utils from './utils';


beforeEach(function() {
  utils.start();
});

afterEach(function() {
  utils.stop();
});


import './anchor-spans';
import './collection-markers';
import './collection-spans';
import './sections';
