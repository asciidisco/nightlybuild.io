module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: ['dist'],
      afterMin: ['dist/style.css', 'dist/main.js']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['robots.txt'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['conference.ics'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['CNAME'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    concat: {
      js: {
        src: ['vendor/jquery.js', 'vendor/modal.js', 'vendor/rAF.js', 'main.js'],
        dest: 'dist/main.js'
      },
      css: {
        src: ['vendor/normalize.css', 'vendor/modal.css', 'vendor/loader.css', 'style.css'],
        dest: 'dist/style.css'        
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          minifyJS: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },    
    cssmin: {
      combine: {
        files: {
          'dist/style.min.css': ['dist/style.css']
        }
      }
    },
    uglify: {
      build: {
        src: 'dist/main.js',
        dest: 'dist/main.min.js'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      images: {
        src: 'dist/img/**/*.{jpg,jpeg,gif,png,webp,svg}'
      },
      js: {
        src: 'dist/*.min.js'        
      },
      css: {
        src: 'dist/*.min.css'        
      },      
    },
    usemin: {
      html: 'dist/index.html',
      css: ['dist/*.min.*.css']
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/img'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }, {
          convertPathData: { 
            straightCurves: false
          }
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.svg'],
          dest: 'dist/img'
        }]
      }
    }       
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');   
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
    
  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'concat', 'uglify', 'cssmin', 'copy', 'imagemin', 'svgmin', 'filerev', 'usemin', 'htmlmin', 'clean:afterMin']);
};
