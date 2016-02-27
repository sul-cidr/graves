

import 'jasmine-jquery';
import 'jasmine-ajax';


import './specs/base-layers';
import './specs/wms-layers';
import './specs/collection-html';
import './specs/collection-markers';
import './specs/collection-modal';
import './specs/section-html';
import './specs/section-boxes';
import './specs/choropleth';


import * as utils from './utils';


afterEach(utils.stop);
