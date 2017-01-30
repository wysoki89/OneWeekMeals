// grab our gulp packages
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  sass = require('gulp-sass');

const TEST_FILES = [
  `server/test/index.js`,
  `server/**/*.spec.js`
];

gulp.task('mocha', function () {
  return gulp
    .src(TEST_FILES, { read: false })
    .pipe(mocha({ growl: 'true', timeout: 3000 }, { reporter: 'spec' }))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit(0));
});
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('mocha-cont', function () {
  return gulp
    .src(TEST_FILES, { read: false })
    .pipe(mocha({ growl: 'true', timeout: 3000 }, { reporter: 'spec' }))
    // .once('error', () => null)
    .on("error", handleError)
});

// configure the jshint task
gulp.task('jshint', function () {
  return gulp.src('./public/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes, mocha-cont will be done also before the task begins
gulp.task('mocha:tdd', ['mocha-cont'], function () {
  return gulp.watch(['./server/**/*.js'], ['mocha-cont']);
});
