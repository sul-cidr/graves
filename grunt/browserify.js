

export default {

  options: {

    transform: [
      'babelify',
    ],

    watch: true,

    browserifyOptions: {
      debug: true
    }

  },

  graves: {
    src: 'app/assets/javascripts/src/index.js',
    dest: 'app/assets/javascripts/dist/script.js'
  }

};
