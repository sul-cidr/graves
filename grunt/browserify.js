

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

  read: {
    src: '<%= src.js %>/read/index.js',
    dest: '<%= dist.js %>/read.js'
  },

};
