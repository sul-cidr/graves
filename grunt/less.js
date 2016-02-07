

export default {

  options: {
    paths: 'node_modules'
  },

  read: {
    src: '<%= src.css %>/read/index.less',
    dest: '<%= dist.css %>/read.css'
  }

};
