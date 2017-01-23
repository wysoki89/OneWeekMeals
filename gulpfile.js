// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    sass = require('gulp-sass');

const TEST_FILES = [
  `server/test/index.js`,
  `server/**/*.spec.js`
];

gulp.task('mocha', function() {
  return gulp
    .src(TEST_FILES, {read: false})
    .pipe(mocha({ growl: 'true', timeout: 6000 }, {reporter: 'spec'}))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit(0));
});

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('./public/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./public/**/*.js', ['jshint']);
});