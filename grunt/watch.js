

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
  },

  jasmine: {
    files: '<%= src.js %>/test/*.spec.js',
    options: {
      reload: true
    }
  }

};
