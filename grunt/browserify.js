

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

    ],

    watch: true,

    browserifyOptions: {
      debug: true
    }

  },

  graves: {
    src: '<%= src.js %>/graves/index.js',
    dest: '<%= dist.js %>/graves.js'
  }

};
