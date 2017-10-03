var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

//Less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
})

//File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var LESS_PATH = 'public/less/**/*.less';

// Styles
// gulp.task('styles', function() {
//   console.log('starting styles task');
//   return gulp.src(['public/css/reset.css', CSS_PATH])
//     .pipe(plumber((err) => {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(concat('styles.css'))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// Styles For scss
// gulp.task('styles', function() {
//   console.log('starting styles task');
//   return gulp.src('public/scss/styles.scss')
//     .pipe(plumber((err) => {
//       console.log('Styles Task Error');
//       console.log(err);
//       this.emit('end');
//     }))
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(sass())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// Styles For LESS
gulp.task('styles', function() {
  console.log('starting styles task');
  return gulp.src('public/less/styles.less')
    .pipe(plumber((err) => {
      console.log('Styles Task Error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [lessAutoprefix]
    }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});


// Screipts
gulp.task('scripts', function (cb) {
  console.log('starting script task');
  pump([
      gulp.src(SCRIPTS_PATH),
      uglify(),
      concat('scripts.js'),
      gulp.dest('public/dist/'),
      (livereload())
    ],
    cb
  );
});
/* error
gulp.task('script', function(){
  console.log('starting scripts task');

  return gulp.src('public/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});
*/
// Images
gulp.task('images', () => {
  console.log('starting images');
});

gulp.task('default', function() {
  console.log('starting default tesk');
});

gulp.task('watch', () => {
  console.log('Starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(CSS_PATH, ['styles']);
  gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(LESS_PATH, ['styles']);
});
