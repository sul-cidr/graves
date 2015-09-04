

require('babel/register');


module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    loadGruntTasks: false,
    data: {
      js: 'app/assets/javascripts',
      less: 'app/assets/stylesheeets',
      dist: 'app/assets/dist',
    }
  });

};
