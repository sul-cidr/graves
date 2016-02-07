

export default {

  options: {
    paths: 'node_modules'
  },

  read: {
    src: '<%= src.css %>/read/index.less',
    dest: '<%= dist.css %>/read.css',
  },

  home: {
    src: '<%= src.css %>/home/index.less',
    dest: '<%= dist.css %>/home.css',
  },

};
