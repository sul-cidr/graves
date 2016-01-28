

export default {

  dist: {
    files: [{
      expand: true,
      cwd: '<%= dist.css %>',
      dest: '<%= dist.css %>',
      src: '*.css',
    }]
  },

};
