

export default {

  options: {

    transform: [

      ['babelify', {

        presets: [
          'es2015',
          'stage-1',
          'react',
        ],

        // TODO: Until Babel 6 adds decorators.
        plugins:[
          'babel-plugin-transform-decorators-legacy',
        ],

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
    src: '<%= src.js %>/src/index.js',
    dest: '<%= dist.js %>/graves.js'
  },

  graves_test: {
    src: '<%= src.js %>/test/index.js',
    dest: '<%= dist.js %>/graves-test.js'
  }

};
