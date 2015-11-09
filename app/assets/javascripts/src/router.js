

import Backbone from 'backbone';


export default Backbone.Router.extend({


  /**
   * Render the application.
   *
   * @param {Object} options
   */
  initialize: function(options) {
    this.store = options.store;
  },


});
