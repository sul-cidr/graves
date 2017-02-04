import $ from 'jquery';
import L from 'leaflet';

import React from 'react';
import Component from './component'

// Adapted from http://mlevans.com/leaflet-hash/
var HAS_HASHCHANGE = (function() {
    var doc_mode = window.documentMode;
    return ('onhashchange' in window) &&
        (doc_mode === undefined || doc_mode > 7);
})();

L.Control.Bookmark = L.Control.extend({
    onAdd: function(map) {
        var el = L.DomUtil.create('span'),
            $el = $(el);
        $el.addClass('leaflet-bar leaflet-control');
        $el.attr('id', 'bookmark-control');
        return el;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.bookmark = function(opts) {
    return new L.Control.Bookmark(opts);
}


L.Hash = function(map, options={}) {
    this.onHashChange = L.Util.bind(this.onHashChange, this);

    if (map) {
        this.init(map);
        L.control.bookmark($.extend({}, options, {
            position: 'topright'
        })).addTo(map);
    }
};

L.Hash.parseHash = function(hash) {
    if(hash.indexOf('#/') === 0) {
        hash = hash.substr(1);
    }
    var args = hash.split("/");
    if (args.length >= 3) {
        var zoom = parseInt(args[1], 10),
        lat = parseFloat(args[2]),
        lon = parseFloat(args[3]),
        scroll = parseInt(args[4], 10);
        if (isNaN(zoom) || isNaN(lat) || isNaN(lon) || isNaN(scroll)) {
            return false;
        } else {
            return {
                center: new L.LatLng(lat, lon),
                zoom: zoom,
                scroll: scroll
            };
        }
    } else {
        return false;
    }
};

L.Hash.formatHash = function(map) {
    var center = map.getCenter(),
        zoom = map.getZoom(),
        precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

    return "#/" + [zoom,
        center.lat.toFixed(precision),
        center.lng.toFixed(precision),
        $('body').scrollTop()
    ].join("/");
},

L.Hash.prototype = {
    map: null,
    lastHash: null,

    parseHash: L.Hash.parseHash,
    formatHash: L.Hash.formatHash,

    init: function(map) {
        this.map = map;

        // reset the hash
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

        var hash = this.formatHash(this.map);
        if (this.lastHash != hash) {
            // location.replace(hash);
            $('#bookmark-link').attr('href', location.origin + location.pathname + hash);
            this.lastHash = hash;
        }
    },

    movingMap: false,
    update: function() {
      var bookmark;
      if (location.hash) {
        bookmark = location.href;
        // location.hash = "";
      } else {
        bookmark = $('#bookmark-link').attr('href');
      }
      if (bookmark) {
        var hash = '#/' + (bookmark.split('#/')[1] || "");
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

export default class extends Component {

    componentDidMount() {
      $('#bookmark-control').append(this.refs.bookmark);
    }

    setBookmarkLink(event) {
      $('#bookmark-link').attr('href', $('#bookmark-link').attr('href', ));
    }

    render() {
      return (
        <span ref="bookmark">
          <a href="#"
             id="bookmark-link"
             title="Bookmark"
             onMouseEnter={this.setBookmarkLink} >
            <i className="fa fa-bookmark" aria-hidden="true"></i>
          </a>
        </span>
      );
    }
}
