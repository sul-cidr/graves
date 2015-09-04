

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
    src: 'app/assets/javascripts/index.js',
    dest: 'app/assets/dist/script.js'
  }

};
