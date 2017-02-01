var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');

const TEST_FILES = [
  `server/test/index.js`,
  `server/**/*.spec.js`
];
//script paths
var jsFiles = 'public/**/*.js',
  jsDest = './public/dist/scripts';

gulp.task('mocha', function () {
  return gulp
    .src(TEST_FILES, { read: false })
    .pipe(mocha({ growl: 'true', timeout: 6000 }, { reporter: 'spec' }))
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
    .pipe(mocha({ growl: 'true', timeout: 6000 }, { reporter: 'spec' }))
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

gulp.task('cleanDist', function () {
  return gulp.src('./public/dist/', { read: false })
    .pipe(clean());
});

gulp.task('scripts', ['cleanDist'], function () {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
});

gulp.task('watch', ['scripts'], function () {
  return gulp.watch(['./public/**/*.*', '!public/dist/scripts/*.js'], ['scripts'])
})

gulp.task('dev', ['watch'], function () {
  return nodemon({
    script: './server/www.js',
    ignore: ['public/dist/']
  })
});