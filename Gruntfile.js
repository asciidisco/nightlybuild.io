module.exports = function(grunt) {
  
  grunt.initConfig({
    
    clean: {
      // clean `distributable` folder (most probably before triggering a new build)
      dist: ['dist'],
      // clean non-used artifacts from the `distributable` folder after the build
      afterMin: ['dist/style.css', 'dist/main.js']
    },
    
    copy: {
      // copy over single files from the root directory to the `distributable` folder
      // add assets if needed
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
      // concatenate js files (manually because of keeping the order intact)
      js: {
        src: ['vendor/jquery.js', 'vendor/modal.js', 'vendor/rAF.js', 'main.js'],
        dest: 'dist/main.js'
      },
      // concatenate css files (manually because of keeping the order intact)
      css: {
        src: ['vendor/normalize.css', 'vendor/modal.css', 'vendor/loader.css', 'style.css'],
        dest: 'dist/style.css'        
      }
    },
    
    // minify the contents of the index.html file (in the `distributable` folder)
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          uglifyJS: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    
    // minify the contents of the concatenated css file (in the `distributable` folder)
    cssmin: {
      combine: {
        files: {
          'dist/style.min.css': ['dist/style.css']
        }
      }
    },
    
    // minify the contents of the concatenated js file (in the `distributable` folder)
    uglify: {
      build: {
        src: 'dist/main.js',
        dest: 'dist/main.min.js'
      }
    },
    
    // revision the asset files names (in the `distributable` folder)
    // patttern: ORIGINALFILENAME.{$HASH}.EXTENSION
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
    
    // replace original filenames with their revisioned coungterparts
    // only changes in index.html & our minified css are necessary
    usemin: {
      html: 'dist/index.html',
      css: ['dist/*.min.*.css']
    },
    
    // apply lossless image compression
    // does also copy the images over to the `distributable` folder 
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
    
    // apply "lossless" svg optimization
    // does also copy the svg´s over to the `distributable` folder    
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
  // ORDER IS IMPORTANT
  grunt.registerTask('default', [
    // clean the distributabel folder
    'clean:dist',
    // concatenate js/css files & copy them over to the dist folder
    // must be done before uglify & cssmin
    'concat',
    // minify the concatenated js files in the dist folder
    'uglify',
    // minify the concatenated css files in the dist folder
    'cssmin',
    // copy over the static assets like the robots.txt
    // static means here, that they won't be changed from some automated process
    'copy',
    // losslessy optimize images & copy them to the dist folder
    'imagemin',
    // losslessy optimize svgs & copy them to the dist folder 
    'svgmin',
    // revision all the assets in the dist folder (must be done after all assets are copied)
    'filerev',
    // exchange all the in file references with the revisioned counterparts (must be done after the filerev task)
    'usemin',
    // minify the html contents, must be done after the usemin task,
    // because it relies on comments in the HTML source
    'htmlmin',
    // housekeeping; remove unecessary artifacts that were generated during the process
    'clean:afterMin'
  ]);
};
