module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/ng-google-chart.js', 'js/app.js', 'js/worldcup_service.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    
    cssmin: {
    	  target: {
    	    files: [{
    	      expand: true,
    	      cwd: 'css',
    	      src: ['*.css', '!*.min.css'],
    	      dest: 'dist/css',
    	      ext: '.min.css'
    	    }]
    	}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify']);


    grunt.registerTask('default',
    [
        'concat',
        'cssmin',
        'uglify'
    ]);
};
