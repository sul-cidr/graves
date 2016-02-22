

import 'jasmine-jquery';
import 'jasmine-ajax';


import './specs/base-layers';
import './specs/wms-layers';
import './specs/collection-html';
import './specs/collection-markers';
import './specs/collection-modal';
import './specs/section-boxes';


import * as utils from './utils';


afterEach(utils.stop);
