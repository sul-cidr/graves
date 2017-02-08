import $ from 'jquery';
import L from 'leaflet';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './component';
import * as mapActions from '../actions/map';
import * as timeSliderActions from '../actions/time-slider';
import * as filterActions from '../actions/filters';


// Adapted from http://mlevans.com/leaflet-hash/
var HAS_HASHCHANGE = (function() {
    var doc_mode = window.documentMode;
    return ('onhashchange' in window) &&
        (doc_mode === undefined || doc_mode > 7);
})();

L.Control.Bookmark = L.Control.extend({
    initialize: function(options) {
      L.Util.setOptions(this, options);
      this.container = options.container;
    },
    onAdd: function(map, container) {
        var el = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-bookmark');
        el.appendChild(this.container);
        return el;
    }
});

L.control.bookmark = function(options) {
    return new L.Control.Bookmark(options);
}


L.Hash = function(map, bookmark) {
    this.onHashChange = L.Util.bind(this.onHashChange, this);

    if (map) {
        this.init(map, bookmark);
    }
};

L.Hash.parseHash = function(hash) {
    if(hash.indexOf('#') === 0) {
        hash = hash.substr(1);
    }
    var args = hash.split("/");
    if (args.length == 11) {
        var zoom = parseInt(args[0], 10),
        lat = parseFloat(args[1]),
        lon = parseFloat(args[2]),
        scroll = parseInt(args[3], 10),
        mapMenu = (args[7] || "").toLowerCase() === "true",
        timeMenu = (args[8] || "").toLowerCase() === "true",
        start = new Date(args[9]),
        end = new Date(args[10]);
        if (isNaN(zoom) || isNaN(lat) || isNaN(lon) || isNaN(scroll)) {
            return false;
        } else {
            return {
                center: new L.LatLng(lat, lon),
                zoom: zoom,
                scroll: scroll,
                baseLayerSlug: args[4] || "",
                wmsLayerSlug: args[5] || "",
                choropleth: args[6] || "",
                showMenu: mapMenu,
                timeSlider: timeMenu,
                start: start,
                end: end
            };
        }
    } else {
        return false;
    }
};

L.Hash.formatHash = function(map, options) {
    var center = map.getCenter(),
        zoom = map.getZoom(),
        precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    options = options || {};
    return "#" + [zoom,
        center.lat.toFixed(precision),
        center.lng.toFixed(precision),
        $('body').scrollTop(),
        options.baseLayerSlug || "",
        options.wmsLayerSlug || "",
        options.choropleth || "",
        options.showMenu || "",
        options.timeSlider || "",
        (options.start && options.start.toISOString()) || "",
        (options.end && options.end.toISOString()) || ""
    ].join("/");
},

L.Hash.prototype = {
    map: null,
    lastHash: null,

    parseHash: L.Hash.parseHash,
    formatHash: L.Hash.formatHash,
    bookmark: null,
    options: {},

    init: function(map, bookmark, options) {
        this.map = map;
        this.bookmark = bookmark;
        this.options = options;

        this.lastHash = null;
        this.onHashChange();
        if (!this.isListening) {
            this.startListening();
        }
    },

    removeFrom: function(map) {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }

        if (this.isListening) {
            this.stopListening();
        }

        this.map = null;
    },

    onMapMove: function() {
        // bail if we're moving the map (updating from a hash),
        // or if the map is not yet loaded
        if (this.movingMap || !this.map._loaded) {
            return false;
        }
        this.updateHash();
    },

    updateHash: function(options={}) {
        var hash = this.formatHash(this.map, {...this.options, ...options});
        if (this.lastHash != hash) {
            // location.replace(hash);
            this.bookmark.setAttribute('href', location.origin + location.pathname + hash);
            this.lastHash = hash;
        }
    },
    movingMap: false,
    update: function(options) {
      var bookmarkHref;
      if (location.hash) {
        bookmarkHref = location.href;
        // location.hash = "";
      } else {
        bookmarkHref = this.bookmark.getAttribute('href');
      }
      if (bookmarkHref) {
        var hash = '#' + (bookmarkHref.split('#')[1] || "");
        if (hash === this.lastHash) {
            return;
        }
        var parsed = this.parseHash(hash);
        if (parsed) {
            this.movingMap = true;
            this.map.setView(parsed.center, parsed.zoom);
            this.movingMap = false;
            $('body').scrollTop(parsed.scroll);
        } else {
            this.onMapMove(this.map);
        }
        return parsed;
      }
    },

    // defer hash change updates every 100ms
    changeDefer: 100,
    changeTimeout: null,
    onHashChange: function() {
        // throttle calls to update() so that they only happen every
        // `changeDefer` ms
        if (!this.changeTimeout) {
            var that = this;
            this.changeTimeout = setTimeout(function() {
                that.update();
                that.changeTimeout = null;
            }, this.changeDefer);
        }
    },

    isListening: false,
    hashChangeInterval: null,
    startListening: function() {
        this.map.on("moveend", this.onMapMove, this);

        if (HAS_HASHCHANGE) {
            L.DomEvent.addListener(window, "hashchange", this.onHashChange);
        } else {
            clearInterval(this.hashChangeInterval);
            this.hashChangeInterval = setInterval(this.onHashChange, 50);
        }
        this.isListening = true;
    },

    stopListening: function() {
        this.map.off("moveend", this.onMapMove, this);

        if (HAS_HASHCHANGE) {
            L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
        } else {
            clearInterval(this.hashChangeInterval);
        }
        this.isListening = false;
    }
};
L.hash = function(map) {
    return new L.Hash(map);
};
L.Map.prototype.addHash = function() {
    this._hash = L.hash(this);
};
L.Map.prototype.removeHash = function() {
    this._hash.removeFrom();
};

@connect(
  state => ({
    mapMenu: state.map.showMenu,
    mapOptions: state.map,
    timeSlider: state.timeSlider.show,
    start: state.filters.startDate,
    end: state.filters.endDate
  }),
  dispatch => {
    return bindActionCreators({
      ...mapActions,
      ...timeSliderActions,
      ...filterActions,
    }, dispatch);
  }
)
export default class extends Component {

    static propTypes = {
      changeBaseLayer: PropTypes.func.isRequired,
      changeWmsLayer: PropTypes.func.isRequired,
      changeChoropleth: PropTypes.func.isRequired,
      toggleTimeSlider: PropTypes.func.isRequired,
      setDateFilter: PropTypes.func.isRequired,
    };

    componentDidMount() {
      // Add navigation hash for bookmarks
      let bookmarkControl = L.control.bookmark({
        position: 'topright',
        container: this.refs.container
      });
      this.props.map.addControl(bookmarkControl);
      // Init the navigation hash and sets controls as needed
      this.navHash = new L.Hash(this.props.map, this.refs.bookmark);
      let options = this.navHash.update();
      if (options) {
        // Anti-pattern right here? ¯\_(ツ)_/¯
        this.props.changeBaseLayer(options.baseLayerSlug);
        this.props.changeWmsLayer(options.wmsLayerSlug);
        this.props.changeChoropleth(options.choropleth);
        this.props.toggleMapMenu(options.showMenu);
        this.props.toggleTimeSlider(options.timeSlider);
        this.props.setDateFilter(options.start, options.end);  // doesn't work
      }
    }

    componentDidUpdate() {
      // Prepare the new options to be saved as a bookmark
      let options = {...this.props.mapOptions, ...{
        timeSlider: this.props.timeSlider,
        start: this.props.start,
        end: this.props.end
      }};
      if (options) {
        this.navHash.updateHash(options);
      }
    }

    render() {
      return (
        <div ref="container">
          <a href="#"
             ref="bookmark"
             title="Bookmark">
            <i className="fa fa-bookmark" aria-hidden="true"></i>
          </a>
        </div>
      );
    }
}
