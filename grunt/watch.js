

export default {

  livereload: {

    files: 'public/**/*',

    options: {
      livereload: true
    }

  },

  stylesheets: {
    files: '<%= src.css %>/*.less',
    tasks: 'less'
  }

};
