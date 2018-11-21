import * as utils from '../utils';

import mountDefaultHTML from
'../fixtures/base-layers/page/mount-default.html';

describe('Home Button', function() {
  it('creates a home button on the leaflet canvas', function() {
    utils.start(mountDefaultHTML);
    expect('.leaflet-home').toExist();
  });
});
