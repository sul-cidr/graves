import _ from "lodash";
import $ from "jquery";
import TestUtils from "react-addons-test-utils";

import codes from "../../src/data/cdc-codes.yml";

import * as utils from "../utils";
import * as assert from "../assert";

describe("Choropleth", function() {
  beforeEach(function() {
    utils.startWithoutModal();
    utils.toggleMapMenu();
  });

  it("lists variables in the dropdown select", function() {
    utils.openChoroplethSelect();

    _.each(_.values(codes.counties), function(label, i) {
      expect($(`.Select-option:nth-child(${i + 1})`)).toHaveText(label);
    });
  });

  it("switches the variable when the select is changed", function() {
    _.each(_.keys(codes.counties), function(code, i) {
      utils.openChoroplethSelect();

      // Click on a variable.
      let option = $(`.Select-option:nth-child(${i + 1})`);
      TestUtils.Simulate.mouseDown(option.get(0));

      assert.choroplethCode(code);
    });
  });
});
