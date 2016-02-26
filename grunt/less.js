

export default {

  options: {
    paths: 'node_modules'
  },

  read: {
    src: '<%= src.css %>/read/index.less',
    dest: '<%= dist.css %>/read.css',
  },

  site: {
    src: '<%= src.css %>/site/index.less',
    dest: '<%= dist.css %>/site.css',
  },

};
