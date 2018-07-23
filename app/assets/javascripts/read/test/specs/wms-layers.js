import $ from "jquery";
import TestUtils from "react-addons-test-utils";

import * as utils from "../utils";
import * as assert from "../assert";

import listLayersHTML from "../fixtures/wms-layers/page/list-layers.html";
import mountDefaultHTML from "../fixtures/base-layers/page/mount-default.html";
import changeLayerHTML from "../fixtures/wms-layers/page/change-layer.html";

describe("WMS Layers", function() {

  it("mounts the default WMS layers on startup", function() {
    utils.start(mountDefaultHTML);

    for (let i of [1, 2, 3]) {
      assert.wmsLayerParams(`address${i}`, `layer${i}`);
    }
  });

  it("lists layers in the dropdown select", function() {
    utils.startWithoutModal(listLayersHTML);
    utils.toggleMapMenu();

    utils.openWmsLayerSelect();

    expect(".Select-option:nth-child(1)").toHaveText("Layer 1");
    expect(".Select-option:nth-child(2)").toHaveText("Layer 2");
    expect(".Select-option:nth-child(3)").toHaveText("Layer 3");
    expect(".Select-option").toHaveLength(3);
  });

  it("switches the layer when the select is changed", function() {
    utils.startWithoutModal(changeLayerHTML);
    utils.toggleMapMenu();

    for (let i of [1, 2, 3]) {
      utils.openWmsLayerSelect();

      // Click on a layer option.
      let option = $(`.Select-option:nth-child(1)`);
      TestUtils.Simulate.mouseDown(option.get(0));

      assert.wmsLayerParams(`address${i}`, `layer${i}`);
    }
  });
});
