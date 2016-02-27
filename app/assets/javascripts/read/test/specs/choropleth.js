

import $ from 'jquery';
import _ from 'lodash';

import codes from '../../src/data/cdc-codes.yml';

import * as utils from '../utils';



describe('Choropleth', function() {

  it('lists variables in the dropdown select', function() {

    utils.start();
    utils.toggleMapMenu();

    utils.openChoroplethSelect();

    _.each(_.values(codes.counties), function(label, i) {
      expect($(`.Select-option:nth-child(${i+1})`)).toHaveText(label);
    });

  });


  it('switches the variable when the select is changed');

});
