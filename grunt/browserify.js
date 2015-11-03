

export default {

  options: {

    transform: [

      ['babelify', {
        optional: [
          'es7.classProperties',
          'es7.decorators',
        ]
      }],

      'yamlify',
      'jadeify',

    ],

    watch: true,

    browserifyOptions: {
      debug: true
    }

  },

  graves: {
    src: '<%= src.js %>/graves/src/index.js',
    dest: '<%= dist.js %>/graves.js'
  },

  graves_test: {
    src: '<%= src.js %>/graves/test/**/*.spec.js',
    dest: '<%= dist.js %>/graves-test.js'
  }

};
