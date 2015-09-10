

export default {

  options: {

    transform: [

      ['babelify', {
        optional: ['es7.classProperties']
      }],

      'yamlify',

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
