const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sass = require('gulp-sass');


// Global Tasks
gulp.task('default', ['serve', 'lint']);
gulp.task('javascript', ['eslint', 'babel']);
gulp.task('build', ['javascript', 'sass', 'html']);

// Server task
gulp.task('serve', ['sass', 'javascript'], () => {
  browserSync.init({
    server: './dist',
  });

  gulp.watch('public/css/sass/*.scss', ['sass']);
  gulp.watch('public/**/*.js', ['javascript']);
  gulp.watch('public/*.html').on('change', browserSync.reload);
});

// Process SASS to sing CSS file
gulp.task('sass', () => gulp.src('public/css/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css')) // copy to dist folder
    .pipe(browserSync.stream())); // pipe into active browsers


// Lint All JS Files
gulp.task('eslint', () => gulp.src(['public/**/*.js', 'server.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('babel', () => gulp.src('public/js/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')));


gulp.task('html', () => {
  gulp.src('public/**/*.html')
    .pipe(gulp.dest('dist/'));
});
