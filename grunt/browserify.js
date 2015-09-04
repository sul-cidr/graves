

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
    src: '<%= js %>/index.js',
    dest: '<%= dist %>/script.js'
  }

};
