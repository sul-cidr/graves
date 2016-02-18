

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

      ['stringify', {
        extensions: ['.html']
      }],

      'yamlify',
      'jadeify',

    ],

    watch: true,

    browserifyOptions: {
      debug: true,
    }

  },

  read: {
    src: '<%= src.js %>/read/src/index.js',
    dest: '<%= dist.js %>/read.js'
  },

  read_test: {
    src: '<%= src.js %>/read/test/index.js',
    dest: '<%= dist.js %>/read-test.js'
  },

};
