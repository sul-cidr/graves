

export default {

  livereload: {

    files: [
      'public/javascripts/graves.js',
      'public/stylesheets/graves.css',
    ],

    options: {
      livereload: true
    }

  },

  stylesheets: {
    files: '<%= src.css %>/**/*.less',
    tasks: 'less'
  }

};
