

export default {

  livereload: {

    files: 'app/assets/**/dist/*',

    options: {
      livereload: true
    }

  },

  stylesheets: {
    files: 'app/assets/**/*.less',
    tasks: 'less'
  }

};
