

export default {

  livereload: {

    files: [
      'public/javascripts/*.js',
      'public/stylesheets/*.css',
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
