

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
    src: '<%= js %>/src/graves/index.js',
    dest: '<%= js %>/dist/graves.js'
  }

};
