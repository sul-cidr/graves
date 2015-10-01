

require('babel/register');


module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  require('load-grunt-config')(grunt, {

    loadGruntTasks: false,

    data: {
      src: {
        js:  'app/assets/javascripts',
        css: 'app/assets/stylesheets',
      },
      dist: {
        js:  'public/assets/javascripts',
        css: 'public/assets/stylesheets',
      }
    }

  });

};
