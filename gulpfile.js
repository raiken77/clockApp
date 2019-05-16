var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var something = '';
gulp.task('build',function()
{
  return browserify({entries: './app/js/index.js',debug:true})
                  .transform("babelify",{presets:["es2015"]})
                  .bundle()
                  .pipe(source('index.js'))
                  .pipe(gulp.dest('./app/js/compiled/'));
});
gulp.task('watch',['build'],function()
{
  gulp.watch('./app/js/*/js',['build']);
});
gulp.task('default',['build','watch']);
