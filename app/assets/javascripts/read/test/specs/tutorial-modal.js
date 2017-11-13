import $ from "jquery";

import * as utils from "../utils";
import * as assert from "../assert";

import mountDefaultHTML from "../fixtures/base-layers/page/mount-default.html";

describe("Tutorial Modal", function() {
  afterEach(() => {
    utils.stop();
  });

  it("appears on load", function() {
    utils.start(mountDefaultHTML);

    expect(".tutorial-modal").toExist();
    expect(".tutorial-modal").toBeVisible();
    expect(".tutorial-modal").not.toBeHidden();
  });

  it("doesn't show when turned off in state", function() {
    utils.startWithoutModal(mountDefaultHTML);

    expect(".tutorial-modal").not.toExist();
    expect(".tutorial-modal").not.toBeVisible();
  });

  it("reappears when the show tutorial button is clicked", function() {
    utils.startWithoutModal(mountDefaultHTML);
    expect(".tutorial-modal").not.toExist();
    const button = document.querySelector(".leaflet-control-tutorial a");
    button.click();
    expect(".tutorial-modal").toExist();
  });
});
