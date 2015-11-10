

import 'jasmine-jquery';
import * as utils from './utils';


beforeEach(function() {
  utils.start();
});

afterEach(function() {
  utils.stop();
});


import './collection-markers';
import './collection-spans';
import './anchor-spans';
