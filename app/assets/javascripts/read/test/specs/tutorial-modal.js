

import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as utils from '../utils';
import * as assert from '../assert';

import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

describe('Tutorial Modal', function() {


  it('appears on load', function() {

    utils.start(mountDefaultHTML);

    expect('.tutorial-modal').toExist();

  });

});
