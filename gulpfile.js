var gulp   = require('gulp');
var mocha  = require('gulp-mocha');
var util   = require('gulp-util');
var concat = require('gulp-concat');
var babel  = require('babel/register');
var gBabel = require('gulp-babel');

gulp.task('default', ['build']);

gulp.task('build', function () {
  return gulp.src("src/**/*.js")
    .pipe(gBabel())
    .pipe(gulp.dest("dist"))
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

