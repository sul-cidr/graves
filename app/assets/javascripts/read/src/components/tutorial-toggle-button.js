import L from "leaflet";

L.Control.tutorialButton = L.Control.extend({
  options: {
    position: "topright"
  },

  onAdd: function(map) {
    const container = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control leaflet-control-tutorial"
    );
    const button = L.DomUtil.create("a", "leaflet-bar-part", container);
    const icon = L.DomUtil.create("i", "fa fa-question", button);
    L.DomEvent.disableClickPropagation(container);

    container.onclick = this.options.onClick;
    return container;
  }
});
