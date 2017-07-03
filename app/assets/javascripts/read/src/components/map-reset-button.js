import L from 'leaflet';

L.Control.resetButton = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-reset');
    const button = L.DomUtil.create('a', 'leaflet-bar-part', container);
    const icon = L.DomUtil.create('i', 'fa fa-refresh', button);
    L.DomEvent.disableClickPropagation(container);

    container.onclick = this.options.onClick;
    return container;
  }
});
