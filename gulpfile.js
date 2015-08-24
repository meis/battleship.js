var gulp       = require('gulp');
var mocha      = require('gulp-mocha');
var util       = require('gulp-util');
var concat     = require('gulp-concat');
var babel      = require('babel/register');
var source     = require('vinyl-source-stream');
var babelify   = require('babelify');
var browserify = require('browserify');

gulp.task('default', ['build']);

gulp.task('build', function () {
  browserify({
    entries: 'src/index.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('battleship.js'))
  .pipe(gulp.dest('.'))
  .on('error', util.log);
});

gulp.task('test', ['build'], function () {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: { js: babel }
    }))
    .on('error', util.log);
});

gulp.task('watch', ['build','test'], function () {
  gulp.watch("./src/**/*" , ['build','test']);
  gulp.watch("./test/**/*", ['build','test']);
});

