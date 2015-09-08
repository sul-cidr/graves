

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
    src: '<%= js %>/src/index.js',
    dest: '<%= js %>/dist/script.js'
  }

};
