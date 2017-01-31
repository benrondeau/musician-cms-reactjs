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

  gulp.watch('src/css/sass/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['javascript']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Process SASS to sing CSS file
gulp.task('sass', () => gulp.src('src/css/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css')) // copy to dist folder
    .pipe(browserSync.stream())); // pipe into active browsers


// Lint All JS Files
gulp.task('eslint', () => gulp.src(['src/**/*.js', 'server.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('babel', () => gulp.src('src/js/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')));


gulp.task('html', () => {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'));
});
