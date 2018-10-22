import $ from "jquery";

import CollectionMarkers from "../../src/components/collection-markers";
import { getLabel } from "../../src/utils";

import * as utils from "../utils";

import showModalJSON from "../fixtures/collection-modal/collections/show-modal.json";

describe("Collection Modal", function() {
  let markers;

  beforeEach(function() {
    utils.start();
    markers = utils.getComponent(CollectionMarkers);
  });

  afterEach(function() {
    utils.closeCollectionModal();
  });

  it("shows the metadata modal on click", function() {
    utils.respondCollections(showModalJSON);

    markers.group.fire("click", {
      layer: markers.idToMarker[1]
    });

    expect("#collection-1.modal").toBeVisible();
  });

  it("formats collections properly", function() {
    const label = getLabel({
      county_c: "County",
      county_p: "P",
      province_c: "Province"
    });
    expect(label).toBe("Province, P County");
  })
});
